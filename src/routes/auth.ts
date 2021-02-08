import { Router } from 'express'
import { LoginUserController } from '../controllers'

const router = Router()

router.post('/login', (req, res) => new LoginUserController().handle(req, res))

export default router
