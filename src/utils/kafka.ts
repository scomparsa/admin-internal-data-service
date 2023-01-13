import { KafkaClient } from '@blued-core-oversea/kafka-client'
import { KAFKA_QCONF_CONFIG_PATH_MAP } from '@/configs'

const kafkaClient = new KafkaClient(KAFKA_QCONF_CONFIG_PATH_MAP as Record<string, string>)
/**
 * 每次使用时调用函数现取， 不要全局缓存
 * https://github.com/bluedapp/node-util-client/tree/master/packages/kafka-client
 * @param key in KAFKA_QCONF_CONFIG_PATH
 */
export const getKafkaClient = (key: string) => kafkaClient.getClient(key)
