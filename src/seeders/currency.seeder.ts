import { Seeder } from '.'
import { Currency } from '../entities'
import { CurrencyAlpha3 } from '../enums'
import { DI } from '../main'

export class CurrencySeeder implements Seeder {
  async seed(): Promise<void> {
    if ((await DI.currencyRepo.count()) === 0) {
      await DI.currencyRepo.persistAndFlush([
        new Currency(CurrencyAlpha3.USD),
        new Currency(CurrencyAlpha3.RUB)
      ])
    }
  }
}
