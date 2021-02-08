import { IsInt, IsOptional } from 'class-validator'

export class AppBaseDto {
  @IsOptional()
  @IsInt()
  userId: number
}
