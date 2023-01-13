import moment from 'moment'
import { Ctx } from '@/gql-server'
import BluedAdmModel from '@/models/bd-offline/blued/blued-adm'

function handleData(adList: BluedAdmModel[], group: string[], show: string[]) {
  // 对于查询的数据, 需要根据url来判断pv量的类型(曝光, 关闭, 点击, 点赞)
  // 简直炸裂, 这表结构设置的很牛逼, 靠
  const showReg = new RegExp(`.*(${show.join('|')}).*`)
  const adObjects = adList.reduce((res, ad) => {
    const key = group
      .filter((key) => key !== 'url')
      .map((item) => (ad as any)[item])
      .join('')
    const [, regRes] = ad.url.match(showReg) as RegExpMatchArray
    const showType = regRes.replace(/_\w/, regRes.substr(3, 1).toUpperCase())
    if (Object.hasOwnProperty.call(res, key)) {
      res[key] = { ...res[key], [showType]: ad.pv }
    } else {
      res[key] = { ...ad, [showType]: ad.pv }
    }
    return res
  }, {} as Record<string, any>)

  return Object.values(adObjects)
}

export const resolvers = {
  Query: {
    adData: async (
      _: any,
      {
        search,
      }: {
        search: {
          selectTime?: string
          adType: number[]
          region?: string[]
          platform: number
          adId?: number
          groups: string[]
          showes: string[]
        }
      },
      ctx: Ctx,
    ) => {
      const { BluedAdmModel } = ctx.models.bdOffline.bluedModels
      const { selectTime, adType, region, platform, adId, groups, showes } = search
      const today = moment().format('YYYYMMDD')
      const [start, end] = selectTime
        ? selectTime.split(',').map((time) => moment(time).format('YYYYMMDD'))
        : [today, today]
      // 广告类型分组中有值为三个数据的组合, 这里需要特殊处理
      const group = groups.length ? [...groups.map((key) => key.split(',')).flat(), 'url'] : ['day', 'url']

      const show = showes.map((key) => key.toLowerCase().replace(/^is/, 'is_'))

      const result: any = []
      const searchObj: any = {
        start,
        end,
        adType,
        region,
        platform,
        show,
        group,
      }
      if (adId) {
        Object.assign(searchObj, { adId: String(adId) })
      }
      const adList = await BluedAdmModel.getListByCustomArgs(searchObj)
      const rows = handleData(adList, group, show)

      rows.map((data) =>
        result.push({
          admId: data.dataValues.admId,
          day: data.dataValues.day,
          title: data.dataValues.title,
          isShow: data.isShow,
          isHidden: data.isHidden,
          isClick: data.isClick,
          isLiked: data.isLike,
          purpose: data.dataValues.purpose,
          region: data.dataValues.region,
          type: data.dataValues.type,
          groups: data.dataValues.groups,
          position: data.dataValues.position,
          platform: data.dataValues.platform,
        }),
      )

      return result
    },
  },
}
