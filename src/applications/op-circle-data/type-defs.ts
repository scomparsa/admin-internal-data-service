import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
  type CircleAdminData {
    day: Int
    uid: Int
    user: User
    ownType: Int
    OwnTypeText: String
    circle: Int
    title: String
    postingNumberAll: Int
    postingNumberReview: Int
    likeNumber: Int
    commentNumber: Int
    shareNumber: Int
    deleteNote: Int
    deleteNoteComment: Int
  }

  type CirclePostData {
    day: Int
    ownType: Int
    OwnTypeText: String
    circle: Int
    title: String
    postingUsers: Int
    postingNumberAll: Int
    postingNumberReview: Int
    likeUsers: Int
    likeNumber: Int
    commentUsers: Int
    commentNumber: Int
    shareUsers: Int
    shareNumber: Int
    deleteNote: Int
    deleteNoteComment: Int
    newJoinUsers: Int
    circleDetailPv: Int
    circleDetailUv: Int
    circleNotePv: Int
    circleNoteUv: Int
    circleNoteDetailPv: Int
    circleNoteDetailUv: Int
    realCircleUsers: Int
    realPostingNumber: Int
    realCommentNumber: Int
  }

  type CircleAdminDatas {
    edges: [CircleAdminData]!
    pageInfo: OffsetBasedPagination
  }

  type CirclePostDatas {
    edges: [CirclePostData]!
    pageInfo: OffsetBasedPagination
  }

  type CircleMessagePushData {
    day: Int
    ownType: Int
    OwnTypeText: String
    circle: Int
    pv: Int
    uv: Int
    title: String
    url: String
  }

  type CircleMessagePushDatas {
    edges: [CircleMessagePushData]!
    pageInfo: OffsetBasedPagination
  }

  input OpCircleDayRange {
    startDay: Int
    endDay: Int
  }

  input OpCircleDataSearch {
    ownType: Int
    day: Int
    picker: String
    dayRange: OpCircleDayRange
  }

  extend type Query {
    """
    基地管理员管理操作日志记录
    """
    circleAdminData(limit: Int!, offset: Int!, search: OpCircleDataSearch): CircleAdminDatas!
      @permission(alias: "DATA##OP_CIRCLE_DATA##ADMIN")
    """
    单个基地发帖数据表
    """
    circlePostData(limit: Int!, offset: Int!, search: OpCircleDataSearch): CirclePostDatas!
      @permission(alias: "DATA##OP_CIRCLE_DATA##POST")
    """
    基地站内信推广数据
    """
    circleMessagePushData(limit: Int!, offset: Int!, search: OpCircleDataSearch): CircleMessagePushDatas!
      @permission(alias: "DATA##OP_CIRCLE_DATA##MESSAGE")
    """
    基地管理员管理操作日志记录
    """
    circleAdminExportData(limit: Int!, offset: Int!, search: OpCircleDataSearch): CircleAdminDatas!
      @permission(alias: "DATA##OP_CIRCLE_DATA##ADMIN_EXPORT")
    """
    单个基地发帖数据表
    """
    circlePostExportData(limit: Int!, offset: Int!, search: OpCircleDataSearch): CirclePostDatas!
      @permission(alias: "DATA##OP_CIRCLE_DATA##POST_EXPORT")
    """
    基地站内信推广数据
    """
    circleMessagePushExportData(limit: Int!, offset: Int!, search: OpCircleDataSearch): CircleMessagePushDatas!
      @permission(alias: "DATA##OP_CIRCLE_DATA##MESSAGE_EXPORT")
  }
`
