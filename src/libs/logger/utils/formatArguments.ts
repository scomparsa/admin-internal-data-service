import { List, flatten, isObjectLike } from 'lodash'

export function formatArguments(args: Record<string, any>, prefix = '') {
  const newArgs: List<any> = Object.entries(args).map(([k, v]) =>
    isObjectLike(v)
      ? formatArguments(v, `${prefix + k}.`)
      : {
          name: prefix + k,
          value: String(v),
        },
  )

  return flatten(newArgs)
}
