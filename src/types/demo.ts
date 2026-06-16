export type DemoAgentId = "leads" | "nutrition" | "quote";

export type DemoAccent = "red" | "cyan" | "violet";

export interface DemoOption {
  label: string;
  value: string;
}

export interface DemoAgent {
  id: DemoAgentId;
  anchor: string;
  title: string;
  cardTitle: string;
  cardDescription: string;
  description: string;
  statusLabel: string;
  source: string;
  accent: DemoAccent;
  flow: string[];
}

export interface DemoHomeContent {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
}

export interface DemoPageContent {
  badge: string;
  title: string;
  subtitle: string;
  supportText: string;
  cta: string;
}

export interface DemoResultField {
  label: string;
  value: unknown;
}
