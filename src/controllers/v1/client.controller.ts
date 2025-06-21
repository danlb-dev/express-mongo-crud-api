import mongoose from "mongoose";
import { ClientSchema } from "../../models/client.model";
import { Request, Response } from 'express';

const Client = mongoose.model('Client', ClientSchema);

// No try/catch needed: Express 5 handles async errors via centralized middleware.

export const addNewClient = async (req: Request, res: Response) : Promise<void> => {
    const newClient = new Client(req.body);
    const client = await newClient.save();
    res.status(201).json(client);
};

export const getClients = async (req: Request, res: Response) : Promise<void> => {
    const clients = await Client.find({});
    res.status(200).json(clients);
};

export const getClientById = async (req: Request, res: Response) : Promise<void> => {
    const client = await Client.findById(req.params.clientId);
    if(!client){
        res.status(404).send('Client not found!');
    }
    else {
        res.status(200).json(client);
    }
};

export const updateClient = async (req: Request, res: Response) : Promise<void> => {
    const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, { new: true, runValidators: true });
    if (!client) {
        res.status(404).json({ error: 'Client not found' });
    }
    else {
        res.status(200).json(client);
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const result = await Client.deleteOne({ _id: req.params.clientId });
    if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully' });
};