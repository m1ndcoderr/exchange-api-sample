import { Request, Response } from 'express'

export async function checkIdInSession(req: Request, res: Response, next: Function) {
  if (req.session.userId) {
    // we could also make a db request to check if user exists:
    // const found = await DI.userRepo.findOne({ id: req.session.userId })
    // if (!found) { ... }
    return next()
  } else {
    return res.sendStatus(403)
  }
}
