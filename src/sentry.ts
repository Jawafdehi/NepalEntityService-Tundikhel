import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  environment: import.meta.env.MODE,
  integrations: [],
})
