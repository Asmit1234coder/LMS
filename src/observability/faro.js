/**
 * observability/faro.js
 *
 * Grafana Faro initialization.
 * Initializes only when VITE_GRAFANA_FARO_URL is configured.
 * The application continues to work normally when configuration is absent.
 */

import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';

let faroInstance = null;

export function initFaro() {
  const faroUrl = import.meta.env.VITE_GRAFANA_FARO_URL;

  if (!faroUrl) {
    // Observability is optional. Application runs normally without it.
    return null;
  }

  try {
    faroInstance = initializeFaro({
      url: faroUrl,
      app: {
        name: import.meta.env.VITE_GRAFANA_APP_NAME || 'library-management-system',
        version: '1.0.0',
        environment: import.meta.env.VITE_GRAFANA_APP_ENV || 'production',
      },
      instrumentations: [
        // Includes: JavaScript errors, page performance, Web Vitals,
        // navigation events, session tracking, console errors
        ...getWebInstrumentations(),
      ],
    });
    return faroInstance;
  } catch (err) {
    // Never crash the application due to observability failure
    console.warn('Grafana Faro initialization failed:', err);
    return null;
  }
}

export function getFaro() {
  return faroInstance;
}
