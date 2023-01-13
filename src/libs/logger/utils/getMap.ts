import { platformMappingApp, platformMappingCountry } from '../configs/mapping-platform-app'

export const getAppByPlatform = (platform: string) => platformMappingApp[platform] || []

export const getCountryByPlatform = (platform: string) => platformMappingCountry[platform] || []
