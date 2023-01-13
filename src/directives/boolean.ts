import { SchemaDirectiveVisitor } from 'apollo-server-koa'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class BooleanDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args)
      if (typeof result === 'number') {
        return Boolean(result)
      }
      return result
    }
  }
}
