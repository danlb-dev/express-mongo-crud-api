import mongoose from "mongoose";
import OrderSchema from "../../models/order.model";
import { Request, Response } from 'express';

const Order = mongoose.model('Order', OrderSchema);

// No try/catch needed: Express 5 handles async errors via centralized middleware.

export const addNewOrder = async (req: Request, res: Response) : Promise<void> => {
    const newOrder = new Order(req.body);
    const order = await newOrder.save();

    res.status(201).json(order);
};

export const getOrders = async (req: Request, res: Response) : Promise<void> => {
    const orders = await Order.find({});
    res.status(200).json(orders);
};

export const getOrderById = async (req: Request, res: Response) : Promise<void> => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
        res.status(404).json({ error: 'Order not found' });
    }
    else {
        res.status(200).json(order);
    }
};

export const updateOrder = async (req: Request, res: Response) : Promise<void> => {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, { new: true, runValidators: true });
    if (!order) {
        res.status(404).json({ error: 'Order not found' });
    }
    else {
        res.status(200).json(order);
    }
};

export const deleteOrder = async (req: Request, res: Response) : Promise<void> => {
    const result = await Order.deleteOne({ _id: req.params.orderId });
    if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Order not found' });
    }
    else {
        res.status(200).json({ message: 'Order deleted successfully' });
    }
};