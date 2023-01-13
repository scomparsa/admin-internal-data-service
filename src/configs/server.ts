import { NODE_ENV, LOCAL_ENV, DEV_ENV, PRO_ENV } from './env'

export const SERVER_ID = 'Internal-Data'

export const HOST_MAPPING: Record<string, string> = {
  [LOCAL_ENV]: '127.0.0.1',
  [DEV_ENV]: '',
  [PRO_ENV]: '',
}

export const SERVER_SETTINGS: Record<string, string | number | undefined> = {
  host: HOST_MAPPING[NODE_ENV],
  port: 7004,
  sessionMaxAge: 86400000,
}
