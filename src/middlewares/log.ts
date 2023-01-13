import { IMiddleware } from 'graphql-middleware'
import { pick } from 'lodash'
import { getLogger } from '@/utils/logger'
import { IS_LOCAL } from '@/configs'

/**
 * 目前只记录request阶段的信息，处理中的extraction之后考虑从这里或者 formatError处做记录
 */
export const logMiddleware: IMiddleware = async (resolve: any, parent: any, args: any, context: any, info: any) => {
  // 屏蔽 child query
  if (parent) {
    const result = await resolve()
    return result
  }

  const startTime = Date.now()

  const result = await resolve()

  const endTime = Date.now()

  process.nextTick(() => {
    const { access } = getLogger()

    Reflect.deleteProperty(info, 'schema')
    info = JSON.parse(JSON.stringify(info))
    /**
     * @param {string} fieldname 请求数据字段原始名称 / 操作名称
     * @param {string} parentType 操作类型 'mutation' | 'query'
     * @param {object} path {prev, key:'fieldname的别名'}
     * @param {string} returnType 返回数据结构的接口名
     * @param {array}  fieldNodes 一个对象数组， 每个对象代表一个要获取的字段的详细信息
     * @param {object} loc {start: number, end: number} 推测是请求生命周期的用时
     * @param {object} result 响应结果
     */
    const logBody = {
      ...pick(context, ['request', 'adminId']),
      ...pick(info, ['fieldName', 'returnType', 'parentType', 'path']),
      // args在上报kafka时 会经过transformer
      arguments: args,
      ms: endTime - startTime,
    }

    if (!IS_LOCAL) {
      access(logBody)
    }
  })

  return result
}
