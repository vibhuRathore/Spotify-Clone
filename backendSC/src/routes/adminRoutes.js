import { Router } from "express";

const router = Router();


router.get("/" , (req,res) => {
    console.log("admin routes");
})


export default router;