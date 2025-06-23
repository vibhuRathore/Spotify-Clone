import { Router } from "express";
import { getStats } from "../controllers/statsController.js";
import {protectRoute , requireAdmin} from "../middleware/authMiddleware.js";

const router = Router();
router.use(protectRoute , requireAdmin);

router.get("/", getStats);


export default router;