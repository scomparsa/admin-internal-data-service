import { SchemaDirectiveVisitor } from 'apollo-server-koa'
import { defaultFieldResolver, GraphQLField } from 'graphql'
import { unixToDateStr } from '@/utils/date-format'

function isDate(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Date]'
}

export class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      let time = await resolve.apply(this, args)

      // !Fix - `TypeError: Cannot read property 'toString' of undefined`
      if (!time) return ''
      if (isDate(time)) time = time.getTime() / 1e3

      if (time.toString().length > 10) {
        time /= 1e3
        time = Math.floor(time)
      }

      return unixToDateStr(time)
    }
  }
}
