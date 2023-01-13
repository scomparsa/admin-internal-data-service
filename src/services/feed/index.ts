import DataLoader from 'dataloader'

export interface FeedService {
}

enum BatchGetFeedsIsAll {
  All = 2,
}

const FeedLoader = new DataLoader<string, feedAPI.Feed | null>(
  async (ids: string[]) => {
    const uniqueIds = Array.from(new Set(ids))

    return feedAPI
      .batchGetFeeds(uniqueIds, BatchGetFeedsIsAll.All)
      .then(({ data: feeds }: { data: feedAPI.Feed[] }) => {
        return ids.map((id) => {
          const feed = feeds.find((feed: feedAPI.Feed) => feed.feedId === id)

          return feed || null
        })
      })
  },
  { cache: false },
)

export const feedService: FeedService = {
  ...feedAPI,
  async getFeedInfo(id) {
    if (!id) return null

    return FeedLoader.load(id)
  },
}
