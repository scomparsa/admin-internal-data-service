import { isObjectLike } from 'lodash'
import { formatArguments } from './utils/formatArguments'

export interface LogData {
  message: any
  level: string
  meta: { [key: string]: any }
  timestamp?: string
}

export interface Transformed {
  '@timestamp': string
  message: { [key: string]: any }
  severity: string
  fields: { [key: string]: any }
}

export interface ITransformer {
  (logData: LogData): Transformed
}

export const transformer: ITransformer = (logData: LogData) => {
  const message = { ...logData.message }
  if (Reflect.has(message, 'arguments') && isObjectLike(message.arguments)) {
    message.arguments = formatArguments(message.arguments)
  }

  return {
    '@timestamp': logData.timestamp ? logData.timestamp : new Date().toISOString(),
    message,
    severity: logData.level,
    fields: logData.meta,
  }
}
