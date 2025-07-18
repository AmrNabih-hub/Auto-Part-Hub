import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://ef23f165f47f69cb560d2dfe56cd4af8@o4509691725479936.ingest.de.sentry.io/4509691819393104",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions, adjust in production
  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample 10% of sessions
  replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
  // Environment
  environment: import.meta.env.MODE || 'development',
  // Enable debug mode in development
  debug: import.meta.env.DEV,
}); 