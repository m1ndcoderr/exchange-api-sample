import { Seeder } from '.'
import { Quote } from '../entities'
import { CurrencyAlpha3 } from '../enums'
import { DI } from '../main'

export class QuotesSeeder implements Seeder {
  async seed(): Promise<void> {
    if ((await DI.quotesRepo.count()) === 0) {
      const usd = await DI.currencyRepo.findOne({ alpha3: CurrencyAlpha3.USD })
      const rub = await DI.currencyRepo.findOne({ alpha3: CurrencyAlpha3.RUB })

      if (usd && rub) {
        await DI.quotesRepo.persistAndFlush([
          new Quote(74.4012, usd, rub, new Date()),
          new Quote(75.6934, usd, rub, new Date(new Date().setDate(new Date().getDate() - 1))),
          new Quote(73.9243, usd, rub, new Date(new Date().setDate(new Date().getDate() - 2))),
          new Quote(71.8523, usd, rub, new Date(new Date().setDate(new Date().getDate() - 3))),
          new Quote(70.6343, usd, rub, new Date(new Date().setDate(new Date().getDate() - 4))),
          new Quote(69.2334, usd, rub, new Date(new Date().setDate(new Date().getDate() - 5))),
          new Quote(67.5465, usd, rub, new Date(new Date().setDate(new Date().getDate() - 6))),
          new Quote(65.6656, usd, rub, new Date(new Date().setDate(new Date().getDate() - 7))),
          new Quote(63.8874, usd, rub, new Date(new Date().setDate(new Date().getDate() - 8))),
          new Quote(61.6511, usd, rub, new Date(new Date().setDate(new Date().getDate() - 9)))
        ])
      }
    }
  }
}
