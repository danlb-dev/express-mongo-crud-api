import mongoose from "mongoose";
import { ProductSchema } from "../models/product.model";
import { Request, Response } from 'express';

const Product = mongoose.model('Product', ProductSchema);

export const addNewProduct = (req: Request, res: Response) => {
    const newProduct = new Product(req.body);

    newProduct.save()
    .then((product) => {
        res.json(product);
    }).catch((err) => {
        res.send(err);
    })
};

export const getProducts = (req: Request, res: Response) => {
    Product.find({})
    .then((products) => {
        res.json(products);
    }).catch((err) => {
        res.send(err);
    });
};

export const getProductById = (req: Request, res: Response) => {
    Product.findById(req.params.productId)
    .then((product) => res.json(product))
    .catch((err) => res.send(err));
};

export const updateProduct = (req: Request, res: Response) => {
    Product.findByIdAndUpdate({ _id: req.params.productId }, req.body, { new: true })
    .then((product) => {
        res.json(product);
    })
    .catch((err) => {
        res.send(err);
    });
};


export const deleteProduct = (req: Request, res: Response) => {
    Product.deleteOne({ _id: req.params.productId })
    .then((value) => {
        res.send(value);
    })
    .catch((err) => {
        res.send(err);
    });
};