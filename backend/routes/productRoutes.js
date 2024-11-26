import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import checkId from "../middleware/checkId.js";
import { addProduct} from "../controllers/productController.js";

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;