import { Router } from 'express'
import * as diarybookCtrl from '../controllers/diarybook.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)


export { router }