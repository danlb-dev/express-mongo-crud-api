import mongoose from "mongoose";
import { ClientSchema } from "../models/client.model";
import { Request, Response } from 'express';

const Client = mongoose.model('Client', ClientSchema);

export const addNewClient = (req: Request, res: Response) => {
    const newClient = new Client(req.body);

    newClient.save()
    .then((client) => {
        res.json(client);
    }).catch((err) => {
        res.send(err);
    })
};

export const getClients = (req: Request, res: Response) => {
    Client.find({})
    .then((clients) => {
        res.json(clients);
    }).catch((err) => {
        res.send(err);
    });
};

export const getClientById = (req: Request, res: Response) => {
    Client.findById(req.params.clientId)
    .then((client) => res.json(client))
    .catch((err) => res.send(err));
};

export const updateClient = (req: Request, res: Response) => {
    Client.findByIdAndUpdate({ _id: req.params.clientId }, req.body, { new: true })
    .then((client) => {
        res.json(client);
    })
    .catch((err) => {
        res.send(err);
    });
};


export const deleteClient = (req: Request, res: Response) => {
    Client.deleteOne({ _id: req.params.clientId })
    .then((value) => {
        res.send(value);
    })
    .catch((err) => {
        res.send(err);
    });
};