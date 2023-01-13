enum app {
  b = '',
}

enum platform {
  data = 'internal-data',
}

enum country {
  internal = 'internal',
}

export const platformMappingApp: { [key: string]: Array<string> } = {
  [platform.data]: [app.b],
}

export const platformMappingCountry: { [key: string]: Array<string> } = {
  [platform.data]: [country.internal],
}
