/* eslint no-underscore-dangle: ["error", { "allow": ["_common", "__resolveType"] }] */
import { gql } from 'apollo-server-koa'
import * as adData from './ad-data'
import * as opCircleData from './op-circle-data'
import * as opHotData from './op-hot-data'

const _common = {
  typeDefs: gql`
    directive @adMaterials on FIELD_DEFINITION
    directive @permission(alias: String) on QUERY | FIELD_DEFINITION | MUTATION
    directive @boolean on FIELD_DEFINITION
    directive @commaArray on FIELD_DEFINITION
    directive @dateFormat on FIELD_DEFINITION
    directive @json(default: String) on FIELD_DEFINITION

    interface MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      errors: [String]
    }

    type OffsetBasedPagination {
      totalCount: Int!
      limit: Int!
      offset: Int!
    }

    extend type User @key(fields: "id") {
      id: Int! @external
    }
  `,
  resolvers: {
    MutationResponse: {
      __resolveType() {
        return null
      },
    },
  },
}

export const schemaModules = {
  _common,
  adData,
  opCircleData,
  opHotData,
}
