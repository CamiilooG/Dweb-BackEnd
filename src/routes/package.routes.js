import{registerPackage, getUnassignedPackages, takePackage, getAssignedPackages, deliveryPackage, getDeliveredPackages} from '../controllers/package.controller.js'
import { Router } from 'express'
const router = Router()

router.post('/registerpackage', registerPackage)
router.get('/getallpackages', getUnassignedPackages)
router.put('/takepackage', takePackage)
router.get('/getassignedpackages', getAssignedPackages)
router.put('/deliverypackage', deliveryPackage)
router.get('/getdeliveredpackages', getDeliveredPackages)
export default router