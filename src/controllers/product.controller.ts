import mongoose from "mongoose";
import { ProductSchema } from "../models/product.model";
import { Request, Response } from 'express';

const Product = mongoose.model('Product', ProductSchema);

// No try/catch needed: Express 5 handles async errors via centralized middleware.

export const addNewProduct = async (req: Request, res: Response) : Promise<void> => {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) : Promise<void> => {
    const products = await Product.find({});
    res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) : Promise<void> => {
    const product = await Product.findById(req.params.productId);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    }
    else {
        res.status(200).json(product);
    }
};

export const updateProduct = async (req: Request, res: Response) : Promise<void> => {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    }
    else {
        res.status(200).json(product);
    }
};

export const deleteProduct = async (req: Request, res: Response) : Promise<void> => {
    const result = await Product.deleteOne({ _id: req.params.productId });
    if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Product not found' });
    }
    else {
        res.status(200).json({ message: 'Product deleted successfully' });
    }
};
