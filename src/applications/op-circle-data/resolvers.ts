import { Ctx } from '@/gql-server'

interface OpCircleDayRange {
  startDay: number
  endDay: number
}
interface OpCircleDataSearch {
  search: {
    picker?: string
    ownType: number
    day: number
    dayRange: OpCircleDayRange
  }
  limit: number
  offset: number
}

enum OpCircleOwnTyoe {
  Op = 1,
  User = 2,
}

const OpCircleOwnTypeText: Record<string, string> = {
  [OpCircleOwnTyoe.Op]: '运营',
  [OpCircleOwnTyoe.User]: '用户',
}

const PickerType: Record<string, string> = {
  date: 'date',
  week: 'week',
  month: 'month',
}

export const resolvers = {
  CircleAdminData: {
    user: ({ uid }: { uid: number }) => ({ id: uid }),
    OwnTypeText: ({ ownType }: { ownType: number }) => OpCircleOwnTypeText[ownType],
  },
  CirclePostData: {
    OwnTypeText: ({ ownType }: { ownType: number }) => OpCircleOwnTypeText[ownType],
  },
  CircleMessagePushData: {
    OwnTypeText: ({ ownType }: { ownType: number }) => OpCircleOwnTypeText[ownType],
  },
  Query: {
    circleMessagePushData: async (_: any, { limit, offset, search }: OpCircleDataSearch, ctx: Ctx) => {
      const { CirclePushDailyModel } = ctx.models.livedata.businessModels
      const { rows, count } = await CirclePushDailyModel.getDataByCondition({ limit, offset, ...search })

      return {
        edges: rows,
        pageInfo: { totalCount: count, limit, offset },
      }
    },
    circleAdminData: async (
      _: any,
      { limit, offset, search: { picker = '', ...rest } }: OpCircleDataSearch,
      ctx: Ctx,
    ) => {
      const {
        CircleAdminReportDailyModel,
        CircleAdminReportWeeklyModel,
        CircleAdminReportMonthlyModel,
      } = ctx.models.livedata.businessModels

      let res = null
      const params = { limit, offset, ...rest }

      switch (picker) {
        case PickerType.week:
          res = await CircleAdminReportWeeklyModel.getDataByCondition(params)
          break
        case PickerType.month:
          res = await CircleAdminReportMonthlyModel.getDataByCondition(params)
          break
        default:
          res = await CircleAdminReportDailyModel.getDataByCondition(params)
          break
      }

      const { rows = [], count = 0 } = res || {}

      return {
        edges: rows,
        pageInfo: { totalCount: count, limit, offset },
      }
    },
    circlePostData: async (
      _: any,
      { limit, offset, search: { picker = '', ...rest } }: OpCircleDataSearch,
      ctx: Ctx,
    ) => {
      const {
        CircleReportDailyModel,
        CircleReportWeeklyModel,
        CircleReportMonthlyModel,
      } = ctx.models.livedata.businessModels

      let res = null

      const params = { limit, offset, ...rest }

      switch (picker) {
        case PickerType.week:
          res = await CircleReportWeeklyModel.getDataByCondition(params)
          break
        case PickerType.month:
          res = await CircleReportMonthlyModel.getDataByCondition(params)
          break
        default:
          res = await CircleReportDailyModel.getDataByCondition(params)
          break
      }

      const { rows = [], count = 0 } = res || {}

      return {
        edges: rows,
        pageInfo: { totalCount: count, limit, offset },
      }
    },
    circleMessagePushExportData: async (_: any, args: OpCircleDataSearch, ctx: Ctx) => {
      return resolvers.Query.circleMessagePushData(_, args, ctx)
    },
    circleAdminExportData: async (_: any, args: OpCircleDataSearch, ctx: Ctx) => {
      return resolvers.Query.circleAdminData(_, args, ctx)
    },

    circlePostExportData: async (_: any, args: OpCircleDataSearch, ctx: Ctx) => {
      return resolvers.Query.circlePostData(_, args, ctx)
    },
  },
}
