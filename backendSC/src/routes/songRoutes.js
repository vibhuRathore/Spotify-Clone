import { Router } from "express";

const router = Router();


router.get("/" , (req,res) => {
    console.log("songs routes");
})


export default router;