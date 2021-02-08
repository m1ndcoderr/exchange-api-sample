import { verify } from 'argon2'
import { Request, Response } from 'express'
import { LoginUserRequestDto } from '../dto/login-user.dto'
import { DI } from '../main'
import validateDto from '../utils/validate-dto'

export class LoginUserController {
  public async handle(req: Request, res: Response) {
    const errors = await validateDto(LoginUserRequestDto, req.body)
    if (errors.length !== 0) {
      return res.status(400).json({ errors })
    }

    const user = await DI.userRepo.findOne({ username: req.body.username })
    if (user) {
      const isPasswordValid = await verify(user.pass, req.body.password)
      if (isPasswordValid) {
        req.session.userId = user.id
        return res.sendStatus(200)
      }
    }
    return res.status(400).json({ errors: ['Invalid credentials'] })
  }
}
