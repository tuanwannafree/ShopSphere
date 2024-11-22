import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({error: "Name is required"});
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.json({error: "Category already exists"});
        }
        const category = await Category({ name }).save();
        res.json(category);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({error: "Category not found"});
        }
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({error: "Category not found"});
        }
        await category.deleteOne();
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const listCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({error: "Category not found"});
        }
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export { createCategory, updateCategory, deleteCategory, listCategory, readCategory };