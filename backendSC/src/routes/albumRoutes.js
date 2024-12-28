import { Router } from "express";

const router = Router();


router.get("/" , (req,res) => {
    console.log("album routes");
})


export default router;