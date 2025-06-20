import mongoose from "mongoose";
import { ProductSchema } from "../models/product.model";
import { Request, Response } from 'express';

const Product = mongoose.model('Product', ProductSchema);

export const addNewProduct = async (req: Request, res: Response) : Promise<void> => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();

        res.status(201).json(product);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getProducts = async (req: Request, res: Response) : Promise<void> => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export const getProductById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: 'Invalid product ID' });
    }
};

export const updateProduct = async (req: Request, res: Response) : Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteProduct = async (req: Request, res: Response) : Promise<void> => {
    try {
        const result = await Product.deleteOne({ _id: req.params.productId });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid product ID' });
    }
};
