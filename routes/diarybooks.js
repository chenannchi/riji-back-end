import { Router } from 'express'
import * as diarybooksCtrl from '../controllers/diarybooks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, diarybooksCtrl.create)
router.get("/", checkAuth, diarybooksCtrl.index)

export { router }