import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
  type HotPostInfo {
    postingId: Int
    circleId: Int
    postingContent: String
    postingPicsRaw: [String]
  }

  type HotFeedInfo {
    feedId: Int
    feedPics: [String]
    feedContent: String
  }

  type HotSuperTopic {
    name: String
    description: String
    avatar: String
  }

  type HotCircle {
    circleId: Int
    title: String
  }

  type HotData {
    id: Int
    postingId: Int
    createTime: String @dateFormat
    commentNum: Int
    repostNum: Int
    likeNum: Int
    post: HotPostInfo
    circle: HotCircle

    superDid: Int
    visitors: Int
    joinNum: Int
    realFeedNum: Int
    visitUv: Int
    postFeedUv: Int
    superTopic: HotSuperTopic

    feedId: Int
    feed: HotFeedInfo
  }

  type HotDataList {
    edges: [HotData]!
    pageInfo: OffsetBasedPagination
  }

  input HotDataSearchInput {
    startTime: Int
    endTime: Int
    type: Int
  }

  extend type Query {
    """
    热门数据列表 type 0 - 基地帖列表  1 - 热门超话列表 2 - 热门动态列表
    """
    opHotData(limit: Int!, offset: Int!, order: String, search: HotDataSearchInput!): HotDataList
      @permission(alias: "DATA##OP_HOT_DATA##ADMIN")
  }
`
