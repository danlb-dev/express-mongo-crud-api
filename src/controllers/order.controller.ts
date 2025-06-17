import mongoose from "mongoose";
import { OrderSchema } from "../models/order.model";
import { Request, Response } from 'express';

const Order = mongoose.model('Order', OrderSchema);

export const addNewOrder = (req: Request, res: Response) => {
    const newOrder = new Order(req.body);

    newOrder.save()
    .then((order) => {
        res.json(order);
    }).catch((err) => {
        res.send(err);
    })
};

export const getOrders = (req: Request, res: Response) => {
    Order.find({})
    .then((orders) => {
        res.json(orders);
    }).catch((err) => {
        res.send(err);
    });
};

export const getOrderById = (req: Request, res: Response) => {
    Order.findById(req.params.orderId)
    .then((order) => res.json(order))
    .catch((err) => res.send(err));
};

export const updateOrder = (req: Request, res: Response) => {
    Order.findByIdAndUpdate({ _id: req.params.orderId }, req.body, { new: true })
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        res.send(err);
    });
};


export const deleteOrder = (req: Request, res: Response) => {
    Order.deleteOne({ _id: req.params.orderId })
    .then((value) => {
        res.send(value);
    })
    .catch((err) => {
        res.send(err);
    });
};