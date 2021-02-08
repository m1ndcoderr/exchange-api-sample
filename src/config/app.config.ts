require('dotenv').config()

export default {
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  port: process.env.APP_PORT || 3000,
  __prod__: process.env.NODE_ENV || 'development'
}
