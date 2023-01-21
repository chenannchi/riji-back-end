import { Router } from 'express'
import * as diariesCtrl from '../controllers/diaries.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, diariesCtrl.create)
router.get('/', checkAuth, diariesCtrl.index)
router.get('/:id', checkAuth, diariesCtrl.show)
router.put('/:id', checkAuth, diariesCtrl.update)
router.delete(':id', checkAuth, diariesCtrl.delete)

export { router }