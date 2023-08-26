import express from 'express'
import { postLocation,getLocations,deleteLocation,updatedLocationState} from '../controllers/locationControllers.js'

const router =express.Router()

router.post('/',postLocation)
router.get('/',getLocations)
router.delete('/:id',deleteLocation)
router.put('/upadateState/:id',updatedLocationState)

export default router