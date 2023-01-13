import { DB_QCONF_CONFIG_PATH } from '@/configs/client'
import { getMysqlClient } from '@/utils/mysql'
import { bdOffline, BdOffline } from './bd-offline'

export interface Models {
  bdOffline: BdOffline
}

export const models: Models = {
  bdOffline,
}

export const modelSetup = () => {
  for (const k in DB_QCONF_CONFIG_PATH) {
    const key = DB_QCONF_CONFIG_PATH[k]

    getMysqlClient(key)
  }
}
