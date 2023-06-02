import { Router } from "express";
import { deliveryGetUsers,registerDelivery, deliveryUpdateUsers, deliveryDeleteUsers, loginDelivery } from "../controllers/delivery.controller.js";
const router = Router()

router.get('/delivery', deliveryGetUsers)
router.post("/registerdelivery", registerDelivery)
router.post("/logindelivery", loginDelivery)
router.put('/delivery', deliveryUpdateUsers)
router.put('/delivery', deliveryDeleteUsers)

export default router