import Cache from '@blued-core/cache'
import { Logger, transformer } from '@/libs/logger'
import { getKafkaClient } from '@/utils/kafka'
import { KAFKA_QCONF_CONFIG_PATH } from '@/configs/client'
import { IS_LOCAL } from '@/configs/env'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('../../package.json')

const winstonLogger = new Logger(
  {
    project: name,
    topic: '',
    logPath: `/data/logs/${name}/`,
    getKafkaClient: () => getKafkaClient(KAFKA_QCONF_CONFIG_PATH.ELKLOG),
    transformer,
    isLocal: IS_LOCAL,
  },
  new Cache(),
)

export const getLogger = () => winstonLogger.getLogger(name)
