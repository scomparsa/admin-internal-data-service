const NODE_ENV = process.env.NODE_ENV as string

const LOCAL_ENV = 'local'
const DEV_ENV = 'development'
const PRO_ENV = 'production'

const IS_LOCAL = NODE_ENV === LOCAL_ENV
const IS_DEV = NODE_ENV === DEV_ENV
const IS_PRO = NODE_ENV === PRO_ENV

export { NODE_ENV, LOCAL_ENV, DEV_ENV, PRO_ENV, IS_LOCAL, IS_DEV, IS_PRO }
