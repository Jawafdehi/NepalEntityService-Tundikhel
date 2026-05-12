import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://ec4cc28406b8fd5dd1af19307884516f@o4511364048027648.ingest.de.sentry.io/4511374508163152',
  environment: import.meta.env.MODE,
  integrations: [],
})
