import { Type } from 'class-transformer'
import { IsDate, IsOptional } from 'class-validator'
import { AppBaseDto } from './app-base.dto'

export class GetQuoteRequestDto extends AppBaseDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date
}
