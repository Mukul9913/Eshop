import express from "express";
import { verify } from "../public/middleware/authenticate.js";
import { save, OrderHistory, OrderById } from "../controller/order.controller.js"
const router = express.Router();


router.post("/save", verify, save);
router.get("/history", verify, OrderHistory);
router.get("/:orderId", verify, OrderById);


export default router;