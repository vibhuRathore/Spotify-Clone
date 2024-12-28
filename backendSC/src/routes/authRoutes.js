import { Router } from "express";

const router = Router();


router.get("/" , (req,res) => {
    console.log("auth routes");
})


export default router;