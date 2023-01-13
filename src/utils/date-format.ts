import moment from 'moment'

function unixToDateStr(unix: number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return moment.unix(unix).format(format)
}

/**
 * Convert dateTime-ID to date string (YYYY-MM-DD HH:mm:ss)
 *
 * @param id {string} dateTime ID
 * @return {string}
 */
function idToDateStr(id: string): string {
  const year = id.slice(0, 4)
  const [month, day, hour, minute, second] = id
    .slice(4, 14)
    .split(/(\d{2})/)
    .filter((v) => v)

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export { unixToDateStr, idToDateStr }
