import { IsDefined, MinLength } from 'class-validator'

export class LoginUserRequestDto {
  @IsDefined()
  @MinLength(4)
  username: string

  @IsDefined()
  @MinLength(4)
  password: string
}
