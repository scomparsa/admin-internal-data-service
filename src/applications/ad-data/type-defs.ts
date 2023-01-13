import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
  type AdData {
    admId: Int
    day: Int
    title: String
    isShow: Int
    isHidden: Int
    isClick: Int
    isLiked: Int
    purpose: Int
    region: String
    type: Int
    groups: Int
    position: Int
    platform: Int
    startuplogoClickPv: Int
  }

  input SearchAdDataInput {
    selectTime: String
    adType: [Int]
    region: [String]
    platform: Int
    adId: Int
    groups: [String]
    showes: [String]
  }

  extend type Query {
    """
    获取广告数据展示列表
    """
    adData(search: SearchAdDataInput): [AdData]! @permission(alias: "DATA##AD_DATA##GET")
  }
`
