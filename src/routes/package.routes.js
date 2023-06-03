import{registerPackage, getUnassignedPackages} from '../controllers/package.controller.js'
import { Router } from 'express'
const router = Router()

router.post('/registerpackage', registerPackage)
router.get('/getallpackages', getUnassignedPackages)

export default router