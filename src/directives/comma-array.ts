import { SchemaDirectiveVisitor } from 'apollo-server-koa'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class CommaArrayDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        return result.split(',')
      }
      return result
    }
  }
}
