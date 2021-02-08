import { Entity, Enum, Property, Unique } from '@mikro-orm/core'
import { CurrencyAlpha3 } from '../enums'
import { Base } from './base'

@Entity()
export class Currency extends Base {
  @Enum({ columnType: 'varchar' })
  @Unique()
  alpha3: CurrencyAlpha3

  constructor(alpha3: CurrencyAlpha3) {
    super()
    this.alpha3 = alpha3
  }
}
