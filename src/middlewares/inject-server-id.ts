import Koa from 'koa'
import { SERVER_ID } from '../configs/server'

export function injectServerId() {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    ctx.set('Server-Id', SERVER_ID)

    return next()
  }
}
