import { feedService, FeedService } from './feed'

export interface Services {
  feedService: FeedService
}

export const services: Services = {
  feedService,
}
