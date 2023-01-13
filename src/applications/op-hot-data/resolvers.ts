import { Ctx } from '@/gql-server'

enum HotDataType {
  CirclePostings = 0,
  SuperDidList = 1,
  FeedList = 2,
}

interface HotPostInfo {
  postingId: number
  circleId: number
  postingContent: string
}
interface HotPostResult {
  id: number
  postingId: number
  createTime: number
  commentNum: number
  repostNum: number
  likeNum: number
  post: HotPostInfo
}
interface HotFeedInfo {
  feedId: number
  feedPics: string[] | undefined
  feedContent: string | undefined
}
interface HotFeedResult {
  id: number
  createTime: number
  commentNum: number
  repostNum: number
  likeNum: number
  feed: HotFeedInfo
}
interface HotSuperTopic {
  description: string | undefined
  name: string | undefined
  avatar: string | undefined
}

interface HotSuperTopicResult {
  id: number
  superDid: number
  visitors: number
  joinNum: number
  realFeedNum: number
  visitUv: number
  postFeedUv: number
  superTopic: HotSuperTopic
}

interface OpCircleDataSearch {
  search: {
    startTime: number
    endTime: number
    type: number
  }
  order?: string
  limit: number
  offset: number
}

export const resolvers = {
  Query: {
    opHotData: async (
      _: any,
      { limit, offset, order = 'id', search: { type, ...params } }: OpCircleDataSearch,
      ctx: Ctx,
    ) => {
      const { HotCirclePostingModel, HotFeedListModel, HotSuperDidListModel } = ctx.models.livedata.businessModels
      const { feedService } = ctx.services

      if (type === HotDataType.CirclePostings) {
        const { rows, count } = await HotCirclePostingModel.getDataByCondition({
          limit,
          offset,
          order,
          search: params,
        })

        const ids = rows.map(({ postingId }: { postingId: number }) => postingId)

        const { data } = await feedService.getPostBatch({ postIds: ids })

        const circleIds = data.map(({ circleId }: { circleId: number }) => circleId)

        const circles = await feedService.batchGetCircles(circleIds)

        const result: HotPostResult[] = rows.map((item) => {
          const { postingId } = item

          const { circleId, postingContent, postingPicsRaw } =
            data.find((post: { postingId: number }) => Number(post.postingId) === postingId) || {}

          const { title } = circles.find((circle) => circle.circleId === circleId) || {}

          return { ...item, post: { circleId, postingContent, postingId, postingPicsRaw }, circle: { title, circleId } }
        })

        return {
          edges: result,
          pageInfo: { totalCount: count, limit, offset },
        }
      }
      if (type === HotDataType.FeedList) {
        const { rows, count } = await HotFeedListModel.getDataByCondition({
          limit,
          offset,
          order,
          search: params,
        })

        const ids = rows.map(({ feedId }: { feedId: number }) => `${feedId}`)

        const { data } = await feedService.batchGetFeeds(ids)

        const result: HotFeedResult[] = rows.map((item) => {
          const { feedId } = item

          const { feedContent, feedPics } = data.find((feed: { feedId: string }) => Number(feed.feedId) === feedId) || {
            feedPics: [''],
          }

          return { ...item, feed: { feedContent, feedPics, feedId } }
        })

        return {
          edges: result,
          pageInfo: { totalCount: count, limit, offset },
        }
      }
      if (type === HotDataType.SuperDidList) {
        const { rows, count } = await HotSuperDidListModel.getDataByCondition({
          limit,
          offset,
          order,
          search: params,
        })

        const ids = rows.map(({ superDid }: { superDid: number }) => superDid)

        const data = await feedService.batchGetSuperTopics(ids)

        const result: HotSuperTopicResult[] = rows.map((item) => {
          const { superDid } = item

          const topicData = data.find((superTopic: { superDid: number }) => Number(superTopic.superDid) === superDid)

          const { description, name, avatar } = topicData || {}

          return { ...item, superTopic: { description, name, avatar } }
        })

        return {
          edges: result,
          pageInfo: { totalCount: count, limit, offset },
        }
      }
    },
  },
}
