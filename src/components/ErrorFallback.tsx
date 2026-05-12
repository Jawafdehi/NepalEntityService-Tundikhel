import type { FallbackRender } from '@sentry/react'

const ErrorFallback: FallbackRender = ({ error, resetError }) => {
  const message = error instanceof Error ? error.message : String(error)
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <p>
        An unexpected error occurred. The issue has been logged and will be
        investigated.
      </p>
      {import.meta.env.DEV && (
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '200px',
            overflow: 'auto',
            fontSize: '0.8rem',
            opacity: 0.7,
            maxWidth: '720px',
            margin: '0 auto 1rem',
            textAlign: 'left',
          }}
        >
          {message}
        </pre>
      )}
      <button onClick={resetError}>Try Again</button>
    </div>
  )
}

export default ErrorFallback
