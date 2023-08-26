import express from 'express'
import {getLivres, postLivre,deleteLivre,getLivre,makezero,makeone,updateLivre} from '../controllers/livresControllers.js'

const router =express.Router()

router.get('/',getLivres)
router.post('/',postLivre)
router.delete('/delete/:id',deleteLivre)
router.get('/:id',getLivre)
router.put('/unavailable/:id',makezero)
router.put('/available/:id',makeone)
router.put('/update/:id',updateLivre)

export default router