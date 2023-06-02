import { Router } from "express";
import { query } from "../controllers/index.controllers.js";
const router = Router()

router.get("/ping", query )


export default router