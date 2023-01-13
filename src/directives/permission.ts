import { ApolloError, ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-koa'
import { GraphQLField, defaultFieldResolver } from 'graphql'
import { Ctx } from '@/gql-server'

export class PermissionDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    const { alias } = this.args

    function validatePermissionAlias(alias: string): boolean {
      const regExp = new RegExp(`^[A-Z_]+##[A-Z_]+(##[A-Z_]+)*$`)
      return regExp.test(alias)
    }

    if (!validatePermissionAlias(alias)) throw new ApolloError(`Permission alias \`${alias}\` named wrong`)

    field.resolve = async function resolver(...rest) {
      const ctx: Ctx = rest[2]

      // ! 校验的逻辑如何提取
      const { adminId, models, mode } = ctx

      if ((!mode || mode !== 'test') && adminId) {
        const {
          AdminUserRoleModel,
          AdminRolePermissionModel,
          AdminPermissionModel,
          AdminRoleModel,
        } = models.operation.adminModels

        const [adminPermission, roleIds] = await Promise.all([
          await AdminPermissionModel.getOneByAlias(alias),
          await AdminUserRoleModel.getRoleIdsByUserId(adminId),
        ])
        const roles = await AdminRoleModel.getListByIds(roleIds)
        const activeRoleIds = roles.filter(({ isActive }) => isActive).map(({ id }) => id)
        const permissionIds = await AdminRolePermissionModel.getPermissionsIdsByRoleIds(activeRoleIds)

        if (!adminPermission) throw new ApolloError(`Permission alias \`${alias}\` not exist`)
        if (!permissionIds.includes(adminPermission.id)) throw new ForbiddenError('no permission')
      }

      const result = await resolve.apply(this, rest)

      return result
    }
  }
}
