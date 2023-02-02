import { Router } from 'express'
import * as diarybooksCtrl from '../controllers/diarybooks.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, diarybooksCtrl.create)
router.post('/:id/diaries/:diaryId', checkAuth, diarybooksCtrl.addDiaryToDiarybook)
router.get("/", checkAuth, diarybooksCtrl.index)
router.get("/:id", checkAuth, diarybooksCtrl.show)
router.put("/:id", checkAuth, diarybooksCtrl.update)
router.delete("/:id", checkAuth, diarybooksCtrl.delete)
router.delete('/:id/diaries/:diaryId', checkAuth, diarybooksCtrl.deleteDiaryFromDiarybook)
export { router }