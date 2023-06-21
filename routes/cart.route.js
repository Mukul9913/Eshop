import { verify } from "../public/middleware/authenticate.js";
import express from "express";
import { addToCart, cartList, loadCart, removeProduct } from "../controller/cart.controller.js";
const router = express.Router();
router.get("/add-to-cart/:userId/:productId", verify, addToCart)
router.get("/cartList", verify, cartList)
router.get("/load-cart", verify, loadCart)
router.get("/delete/:productId", verify, removeProduct)

export default router;

