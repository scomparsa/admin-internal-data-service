import { SchemaDirectiveVisitor } from 'apollo-server-koa'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class JsonDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        try {
          return JSON.parse(result || this.args.default)
        } catch (err) {
          return result
        }
      }
      return result
    }
  }
}
