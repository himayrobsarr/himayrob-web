# Himayrob Web

Sitio público para vender sesiones 1 a 1 por horas, captar leads de clase
gratis y conectar el flujo comercial con n8n, Postgres, Wompi, Google Calendar,
Google Meet, Sheets y WhatsApp.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- n8n para automatizaciones
- Postgres como base principal

## Scripts

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

En PowerShell de Windows se usa `npm.cmd` para evitar bloqueos de ejecución de
`npm.ps1`.

## Variables De Entorno

Copia `.env.example` a `.env` y configura:

```env
VITE_N8N_CLASS_WEBHOOK=
VITE_N8N_CONSULTING_AVAILABILITY_WEBHOOK=
VITE_N8N_CONSULTING_INIT_PAYMENT_WEBHOOK=
VITE_WOMPI_PUBLIC_KEY=
```

Los secretos de Wompi deben vivir en n8n, no en el frontend.

## Flujo De Consultoría

La página `/consultoria` vende sesiones por horas:

- `1 hora`: `$75.000 COP`
- `2 horas`: `$150.000 COP`
- `3 horas`: `$225.000 COP`

Reglas:

- Máximo 3 horas seguidas.
- Horarios en horas exactas.
- Disponibilidad desde lunes `00:00` hasta sábado `14:00`.
- Descanso desde sábado `14:00` hasta lunes `00:00`.
- Reagendamiento con mínimo 6 horas de anticipación.
- El pago confirma la reserva.

El frontend consulta disponibilidad en n8n, recibe horarios libres y luego pide
a n8n iniciar el pago con Wompi.

## Documentación Interna

- `docs/postgres-booking-schema.sql`: esquema inicial de Postgres.
- `docs/n8n-booking-workflows.md`: contratos y pasos de workflows en n8n.

## Wompi

El frontend usa el widget de Wompi, pero la firma de integridad debe generarse
en n8n. La URL de redirección es `/consultoria/gracias`; Wompi puede volver con
un parámetro `id` que se muestra al usuario como referencia.

La confirmación real de la reserva debe depender del webhook/evento de Wompi y
de la verificación server-side desde n8n.
