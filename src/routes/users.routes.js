import { Router } from "express";
import { getUsers, registerUser, updateUser, deleteUser, loginUser } from "../controllers/users.controllers.js";
const router = Router();

router.get("/user", getUsers),
router.post('/login', loginUser)
router.post('/registeruser', registerUser)
router.put('/user', updateUser)
router.delete('/user', deleteUser)
export default router