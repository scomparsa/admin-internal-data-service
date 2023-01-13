import { Context } from 'koa'
import { init, captureException, captureMessage } from '@sentry/node'
import { IS_LOCAL, NODE_ENV, SENTRY_DSN, SERVER_ID, SERVER_SETTINGS } from './configs'

import { app } from './app'
import { gqlServerBootstrap } from './gql-server'

import { modelSetup } from './models'

if (!IS_LOCAL) {
  /**
   * send error message to Sentry
   */
  init({ dsn: SENTRY_DSN, environment: NODE_ENV })

  if (process.listeners('unhandledRejection').length < 1) {
    ;(process as NodeJS.EventEmitter).on('uncaughtException', (err) => {
      captureException(err)
      process.exit(1)
    })
  }

  if (process.listeners('uncaughtException').length < 1) {
    ;(process as NodeJS.EventEmitter).on('uncaughtException', (err) => {
      captureException(err)
      process.exit(1)
    })
  }

  app.on('error', (err: Error, ctx: Context) => {
    console.error(err, ctx)
    captureException(err)
    if (ctx) captureMessage(JSON.stringify(ctx))
  })
}

async function main() {
  modelSetup()
  gqlServerBootstrap(app)

  app.listen(SERVER_SETTINGS.port, () => {
    console.info(`🌍 ${SERVER_ID} service is running at ${SERVER_SETTINGS.host}:${SERVER_SETTINGS.port}`)
  })
}

main()
