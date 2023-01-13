import path from 'path'
import { QconfConfItem } from '@blued-core/qconf-conf'
import { MysqlConfItem } from '@blued-core/mysql-conf'
import { RedisConfItem } from '@blued-core/redis-conf'

const getModelPath = (modelPath: string) => path.resolve(__dirname, `../models/${modelPath}/!(*index).{ts,js}`)

export const CLIENT_SYNC_INTERVAL = 30000

export const DB_QCONF_CONFIG_PATH: Record<string, string> = {
  BD_OFFLINE: 'bd-offline',
  OPERATION: 'operation',
  LIVEDATA: 'livedata',
}

export const DB_QCONF_CONFIG_PATH_MAP: Record<string, MysqlConfItem> = {
  [DB_QCONF_CONFIG_PATH.BD_OFFLINE]: {
    qconf: '',
    database: '',
    modelPath: getModelPath('bd-offline'),
  },
  [DB_QCONF_CONFIG_PATH.OPERATION]: {
    qconf: '',
    database: 'admin',
    modelPath: getModelPath('operation/admin'),
  },
  [DB_QCONF_CONFIG_PATH.LIVEDATA]: {
    qconf: '',
    database: 'business_data',
    modelPath: getModelPath('livedata/business'),
  },
}

export const REDIS_QCONF_CONFIG_PATH: Record<string, string> = {}

export const REDIS_QCONF_CONFIG_PATH_MAP: Record<string, RedisConfItem> = {}

export const KAFKA_QCONF_CONFIG_PATH: Record<string, string> = {
  ELKLOG: 'elklog',
  NEZHA: 'nezha',
}

export const KAFKA_QCONF_CONFIG_PATH_MAP: Record<string, QconfConfItem> = {
  [KAFKA_QCONF_CONFIG_PATH.ELKLOG]: '',
  [KAFKA_QCONF_CONFIG_PATH.NEZHA]: '',
}
