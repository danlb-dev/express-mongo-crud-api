import mongoose from "mongoose";
import { OrderSchema } from "../models/order.model";
import { Request, Response } from 'express';

const Order = mongoose.model('Order', OrderSchema);

export const addNewOrder = async (req: Request, res: Response) : Promise<void> => {
    try {
        const newOrder = new Order(req.body);
        const order = await newOrder.save();

        res.status(201).json(order);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getOrders = async (req: Request, res: Response) : Promise<void> => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const getOrderById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ error: 'Invalid order ID' });
    }
};

export const updateOrder = async (req: Request, res: Response) : Promise<void> => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true, runValidators: true });
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteOrder = async (req: Request, res: Response) : Promise<void> => {
    try {
        const result = await Order.deleteOne({ _id: req.params.orderId });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Order not found' });
        }
        
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid order ID' });
    }
};