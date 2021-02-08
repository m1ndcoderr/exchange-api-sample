import { Router } from 'express'
import { GetQuotesController } from '../controllers'
import { checkIdInSession } from '../middlewares'

const router = Router()

// alternatively we could use route params like /quotes/:id or /quotes/date/:date
// req.params.id or req.params.date, but won't it be less convenient?
router.get('/', checkIdInSession, (req, res) => new GetQuotesController().handle(req, res))

export default router
