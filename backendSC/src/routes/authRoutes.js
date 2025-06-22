import { Router } from "express";
import { authCallback } from "../controllers/authController.js";

const router = Router();


router.post("/" , authCallback)


export default router;