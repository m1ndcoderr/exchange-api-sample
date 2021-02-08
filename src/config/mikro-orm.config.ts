import { LoadStrategy, Options } from '@mikro-orm/core'
import { Base, Currency, Quote, User } from '../entities'
import appConfig from './app.config'
require('dotenv').config()

export default {
  loadStrategy: LoadStrategy.SELECT_IN,
  entities: [Base, Currency, Quote, User],
  type: 'postgresql',
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT,
  debug: appConfig.__prod__ !== 'production',
  migrations: {
    pattern: /^[\w-]+\d+\.ts$/,
    tableName: 'migrations',
    path: 'src/migrations',
    transactional: true,
    allOrNothing: true
  }
} as Options
