import Cache from '@blued-core/cache'
import { MysqlConf } from '@blued-core/mysql-conf'
import MysqlClient from '@blued-core/mysql-client'
import { IS_LOCAL, CLIENT_SYNC_INTERVAL, DB_QCONF_CONFIG_PATH_MAP } from '@/configs'

const mysqlConf = new MysqlConf(DB_QCONF_CONFIG_PATH_MAP)

const mysqlClient = new MysqlClient(mysqlConf, new Cache(), IS_LOCAL, CLIENT_SYNC_INTERVAL)

/**
 * 每次使用时调用函数现取， 不要全局缓存
 * https://github.com/bluedapp/node-util-client/tree/master/packages/mysql-client
 * @param path
 */
export const getMysqlClient = (path: string) => mysqlClient.getClient(path)
