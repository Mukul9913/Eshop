import express from "express";
import { productView, allProduct, productByCategory, search } from "../controller/product.controller.js";
import { verify } from "../public/middleware/authenticate.js";


const router = express.Router();

router.get("/view/:id", verify, productView);
router.get("/all", verify, allProduct);
router.get("/:categoryName", verify, productByCategory);
router.get("/product-search/:keyword", search);

export default router;