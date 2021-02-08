import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { Base } from './base'
import { Currency } from './currency'

@Entity()
@Unique({ properties: ['quoteDate', 'mainCurrency', 'relatedCurrency'] })
export class Quote extends Base {
  /**
   * Which day this quote represents.
   */
  @Property({ columnType: 'date' })
  quoteDate: Date

  /**
   * This column represents the quote value. Example: 75,69 for USD/RUB.
   */
  @Property({ columnType: 'numeric(1000, 4)' }) // numeric(precision, scale), where 1000 is a max of precision
  value: number

  /**
   * Example: USD / RUB
   * This column is the FIRST part of quote (i.e USD) in example above.
   */
  @ManyToOne()
  mainCurrency: Currency

  /**
   * Example: USD / RUB
   * This column is the SECOND part of quote (i.e RUB) in example above.
   */
  @ManyToOne()
  relatedCurrency: Currency

  constructor(value: number, mainCurrency: Currency, relatedCurrency: Currency, quoteDate: Date) {
    super()
    this.value = value
    this.quoteDate = quoteDate
    this.mainCurrency = mainCurrency
    this.relatedCurrency = relatedCurrency
  }
}
