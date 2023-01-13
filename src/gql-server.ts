import Koa from 'koa'
import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-koa'
import { buildFederatedSchema } from '@apollo/federation'
import { applyMiddleware } from 'graphql-middleware'
import { schemaModules } from './applications'
import { models, Models } from './models'
import { services, Services } from './services'
import { logMiddleware } from './middlewares/log'
import * as directives from './directives'

export interface Ctx {
  request: Koa.Request
  adminId: number
  models: Models
  services: Services
  mode?: string
}

export const gqlServerBootstrap = async (app: any) => {
  const schema = applyMiddleware(buildFederatedSchema(Object.values(schemaModules)), logMiddleware)
  const context = ({ ctx: { request } }: { ctx: Koa.Context }) => ({
    request,
    models,
    services,
    adminId: Number(request.headers['admin-id']),
  })

  SchemaDirectiveVisitor.visitSchemaDirectives(schema, directives)
  const server = new ApolloServer({ schema, context })

  server.applyMiddleware({ app })
}
