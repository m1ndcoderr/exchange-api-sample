import { Router } from 'express'
import auth from './auth'
import quotes from './quotes'

const router = Router()

router.use('/auth', auth)
router.use('/quotes', quotes)

export default router
