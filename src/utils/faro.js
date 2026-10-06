import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

export function initFaro() {
  const telemetryUrl = import.meta.env.VITE_GRAFANA_TELEMETRY_URL;

  if (!telemetryUrl) {
    console.warn('Grafana Faro telemetry URL not configured. Observability is disabled.');
    return null;
  }

  return initializeFaro({
    url: telemetryUrl,
    app: {
      name: 'library-management-system',
      version: '1.0.0',
      environment: 'production'
    },
    instrumentations: [
      ...getWebInstrumentations(),
    ],
  });
}
