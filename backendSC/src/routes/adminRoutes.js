import { Router } from "express";
import { checkAdmin, createAlbum, createSong , deleteAlbum, deleteSong}  from "../controllers/adminController.js";
import { protectRoute , requireAdmin} from "../middleware/authMiddleware.js"

const router = Router();

router.use(protectRoute,requireAdmin);

router.get("/check-admin",checkAdmin);

router.post("/songs",createSong)

router.delete("/songs/:id",deleteSong)   

router.post("/albums",createAlbum)

router.delete("/albums/:id",deleteAlbum)


export default router;