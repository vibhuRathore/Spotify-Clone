import { Router } from "express";
import { getAlbumbyId, getAllAlbums } from "../controllers/albumController.js";

const router = Router();


router.get("/" , getAllAlbums);
router.get("/:albumId" , getAlbumbyId);


export default router;