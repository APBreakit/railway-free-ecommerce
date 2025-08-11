import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN_WEB,
  tracesSampleRate: 0.1,
  debug: false,
  environment: process.env.RAILWAY_ENVIRONMENT || process.env.NODE_ENV || 'development',
})