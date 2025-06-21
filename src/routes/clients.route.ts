import { Express } from 'express';
import { 
    addNewClient, 
    getClients, 
    getClientById, 
    updateClient, 
    deleteClient 
} from '../controllers/v1/client.controller';

const clientsRouter = (app: Express) => {
    app.route('/api/v1/clients')
    .get(getClients)
    .post(addNewClient);

    app.route('/api/v1/clients/:clientId')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);
};

export default clientsRouter;