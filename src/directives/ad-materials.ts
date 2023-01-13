import { SchemaDirectiveVisitor } from 'apollo-server-koa'
import { defaultFieldResolver, GraphQLField } from 'graphql'

export class AdMaterialsDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args)
      if (typeof result === 'string') {
        try {
          return Object.entries(JSON.parse(result)).map(([size, url]: [string, string]) => ({ size, url }))
        } catch (err) {
          return []
        }
      }
      return []
    }
  }
}
