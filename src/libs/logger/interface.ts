import Cache from '@blued-core/cache-intl'

export interface Loggers {
  accessLog: (res: any) => any
  errorLog: (res: any) => any
}

export interface LoggerOptions {
  project: string
  getKafkaClient: () => any
  topic: string
  transformer: any
  logPath: string
  isLocal?: boolean
}

export interface LoggerIntl {
  logPath: string
  isLocal?: boolean
  cache?: Cache<Loggers>
  getLogger: (logType: string) => LoggerClient
  buildLogger: (logType: string) => Loggers
}

export interface LoggerClient {
  access: (data?: Record<string, any>) => void
  error: (error: Error, data?: Record<string, any>) => void
}

export default abstract class Logger implements LoggerIntl {
  public logPath: string

  public isLocal: boolean

  private colors: any

  project: string

  getKafkaClient: any

  topic: string

  transformer: any

  constructor(public opts: LoggerOptions, public cache: Cache<Loggers>) {
    this.logPath = opts.logPath
    this.isLocal = opts.isLocal || false

    this.project = opts.project
    this.getKafkaClient = opts.getKafkaClient
    this.topic = opts.topic
    this.transformer = opts.transformer

    if (this.isLocal) {
      this.colors = require('colors')
    }
  }

  getLogger(logType: string) {
    const logger = this.buildLogger(logType)

    return {
      access(data?: Record<string, any>) {
        logger.accessLog(data)
      },
      error(error: Error, data?: Record<string, any>) {
        const err = {
          err_msg: error.message,
          err_name: error.name,
          err_stack: error.stack,
        }

        const results = { ...err, ...data }

        logger.errorLog(results)
      },
    }
  }

  abstract buildLogger(logType: string): Loggers
}
