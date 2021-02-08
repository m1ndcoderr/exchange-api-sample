import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { GetQuoteRequestDto } from '../dto'
import { CurrencyAlpha3 } from '../enums'
import { DI } from '../main'
import validateDto from '../utils/validate-dto'

export class GetQuotesController {
  public async handle(req: Request, res: Response) {
    const errors = await validateDto(GetQuoteRequestDto, req.query)
    if (errors.length !== 0) {
      return res.status(400).json({ errors })
    }

    const filter: any = {}
    const select: any = {}

    // This params are hardcoded for simplicity, sure they could be in query:
    filter.mainCurrency = { alpha3: CurrencyAlpha3.USD }
    filter.relatedCurrency = { alpha3: CurrencyAlpha3.RUB }
    select.populate = ['mainCurrency', 'relatedCurrency']

    // Full input data will be here:
    const inputData = plainToClass(GetQuoteRequestDto, req.query)

    // And then we can collect the filter object:
    if (inputData.date) {
      filter.quoteDate = this.convertInputDate(inputData.date)
    }
    // if (inputData.id) { ... }
    // if (inputData.offset) { ... }
    // if (inputData.limit) { ... } etc.

    // result will be an array with 1 element
    // but with findAndCount() result of that method could be paginated and look like:
    // { items: [...], total: 15, limit: 10, offset: 0 }
    const items = await DI.quotesRepo.find(filter, select)

    return res.status(200).json(items)
  }

  private convertInputDate(date: Date): string {
    date.setUTCHours(0, 0, 0, 0)
    date.setDate(date.getUTCDate() + 1)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }
}
