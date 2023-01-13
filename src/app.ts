import 'reflect-metadata'
import Koa from 'koa'
import helmet from 'koa-helmet'
import realIp from 'koa-real-ip'
import session from 'koa-session'
import { injectServerId } from './middlewares/inject-server-id'
import { SERVER_SETTINGS } from './configs'

const app = new Koa()

app.use(helmet())
app.use(realIp())
app.use(session({ maxAge: <number>SERVER_SETTINGS.sessionMaxAge }, app))
app.use(injectServerId())

export { app }
