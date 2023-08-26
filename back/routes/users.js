import express from 'express'
import {getUsers,deleteUser,updateUser, postUser} from '../controllers/usersControllers.js'

const router =express.Router()

router.get('/',getUsers)
router.post('/',postUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)


export default router