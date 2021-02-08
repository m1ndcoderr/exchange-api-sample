import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import appConfig from './config/app.config'
import mikroOrmConfig from './config/mikro-orm.config'
import { Currency, Quote, User } from './entities'
import routes from './routes'
import { CurrencySeeder, QuotesSeeder, UserSeeder } from './seeders'

export const DI = {} as {
  orm: MikroORM
  em: EntityManager
  userRepo: EntityRepository<User>
  currencyRepo: EntityRepository<Currency>
  quotesRepo: EntityRepository<Quote>
}

async function bootstrap() {
  // init ORM
  DI.orm = await MikroORM.init(mikroOrmConfig)
  DI.em = DI.orm.em
  DI.userRepo = DI.orm.em.getRepository(User)
  DI.currencyRepo = DI.orm.em.getRepository(Currency)
  DI.quotesRepo = DI.orm.em.getRepository(Quote)

  // execute all migrations
  await DI.orm.getMigrator().up()

  // seed database tables with test data
  if (appConfig.__prod__ === 'development') {
    new CurrencySeeder().seed()
    new QuotesSeeder().seed()
    new UserSeeder().seed()
  }

  // create express app
  const app = express()

  // middlewares
  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next)
  })

  app.use(
    session({
      secret: appConfig.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 1000 * 60 * 24 }
    })
  )

  // api routes
  app.use('/api', routes)
  app.use((_req, res) => res.status(404).json({ message: 'No route found' }))

  app.listen(appConfig.port, () => {
    console.log(`Server is running on port ${appConfig.port}.`)
  })
}

bootstrap()
