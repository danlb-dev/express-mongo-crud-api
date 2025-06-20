import mongoose from "mongoose";
import { ClientSchema } from "../models/client.model";
import { Request, Response } from 'express';

const Client = mongoose.model('Client', ClientSchema);

export const addNewClient = async (req: Request, res: Response) : Promise<void> => {
    try {
        const newClient = new Client(req.body);
        const client = await newClient.save();

        res.status(201).json(client);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getClients = async (req: Request, res: Response) : Promise<void> => {
    try {
        const clients = await Client.find({});
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};

export const getClientById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const client = await Client.findById(req.params.clientId);
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (err) {
        res.status(400).json({ error: 'Invalid client ID' });
    }
};

export const updateClient = async (req: Request, res: Response) : Promise<void> => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.clientId, req.body, { new: true, runValidators: true });
        if (!client) {
            res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (err: any) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation failed', details: err.message });
        }

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const result = await Client.deleteOne({ _id: req.params.clientId });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: 'Client not found' });
        }

        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid client ID' });
    }
};