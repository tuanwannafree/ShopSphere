import asyncHandler from "../middleware/asyncHandler.js";
import Product  from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const {name, description, price,category, quantity, brand} = req.fields;
        console.log(name, description, price,category, quantity, brand);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
})

export {addProduct};