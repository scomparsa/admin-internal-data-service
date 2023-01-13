export function getInfoFromReferer(referer: string) {
  const [, platform = ''] = (referer && referer.match(/\.\w+\/(\w+)/)) || []
  return { platform }
}
