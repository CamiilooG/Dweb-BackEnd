import { Router } from "express"
import { loginAdmin, getDataPackage } from "../controllers/admin.controller.js"

const router = Router()
router.post('/loginadmin', loginAdmin)
router.get('/countbygroup', getDataPackage)

export default router