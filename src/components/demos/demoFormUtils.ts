const himayrobWhatsappNumber = "573213619143";

export interface OptionalWebhookResult {
  ok: boolean;
  message: string;
  fromWebhook: boolean;
  summary?: unknown;
  whatsappUrl?: string;
  rawResponse?: unknown;
}

interface DemoWebhookResponse {
  ok?: boolean;
  stored?: boolean;
  message?: string;
  whatsappUrl?: string;
  summary?: unknown;
}

export function buildHimayrobWhatsappUrl(message: string) {
  return `https://wa.me/${himayrobWhatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

export function hasUsefulSummary(
  summary: unknown,
): summary is Record<string, unknown> {
  return Boolean(
    summary &&
      typeof summary === "object" &&
      !Array.isArray(summary) &&
      Object.keys(summary as Record<string, unknown>).length > 0,
  );
}

export function safeText(
  value: unknown,
  fallback = "No especificado",
): string {
  if (value === null || value === undefined) return fallback;

  if (Array.isArray(value)) {
    const text = value
      .map((item: unknown) => safeText(item, ""))
      .filter(Boolean)
      .join(", ")
      .trim();

    return text || fallback;
  }

  if (typeof value === "object") return fallback;

  const text = String(value).trim();
  return text || fallback;
}

function normalizeKey(key: string) {
  return key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

export function getSummaryValue(summary: unknown, keys: string[]) {
  if (!hasUsefulSummary(summary)) return undefined;

  const normalizedKeys = keys.map(normalizeKey);
  const entries = Object.entries(summary);
  const exactMatch = entries.find(([key]) =>
    normalizedKeys.includes(normalizeKey(key)),
  );

  if (exactMatch) return exactMatch[1];

  const nestedRecord = entries.find(([, value]) => hasUsefulSummary(value))?.[1];

  if (nestedRecord) {
    return getSummaryValue(nestedRecord, keys);
  }

  return undefined;
}

export function getSummaryText(
  summary: unknown,
  fallback: string,
  keys = ["summary", "resumen", "message", "mensaje", "description"],
) {
  if (typeof summary === "string") return safeText(summary, fallback);

  return safeText(getSummaryValue(summary, keys), fallback);
}

export async function submitOptionalDemoWebhook(
  webhookUrl: string,
  payload: unknown,
): Promise<OptionalWebhookResult> {
  if (!webhookUrl) {
    return {
      ok: true,
      fromWebhook: false,
      message:
        "Demo generado en modo simulación. Cuando conectes n8n, este payload puede enviarse automáticamente.",
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | DemoWebhookResponse
      | null;

    if (!response.ok) {
      throw new Error(
        data?.message || `Webhook respondió HTTP ${response.status}.`,
      );
    }

    if (!data?.ok) {
      throw new Error(data?.message || "n8n no devolvió una respuesta válida.");
    }

    return {
      ok: true,
      fromWebhook: true,
      message: data.message || "Demo generado y enviado al webhook de n8n.",
      summary: data.summary,
      whatsappUrl: data.whatsappUrl,
      rawResponse: data,
    };
  } catch (error) {
    return {
      ok: false,
      fromWebhook: true,
      message:
        error instanceof Error
          ? error.message
          : "El webhook opcional no respondió. Revisa n8n.",
    };
  }
}
