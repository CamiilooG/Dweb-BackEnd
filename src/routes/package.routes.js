import{registerPackage} from '../controllers/package.controller.js'
import { Router } from 'express'
const router = Router()

router.post('/registerpackage', registerPackage)

export default router