import { Express } from 'express';
import { 
    addNewClient, 
    getClients, 
    getClientById, 
    updateClient, 
    deleteClient 
} from '../controllers/client.controller';

const clientsRouter = (app: Express) => {
    app.route('/clients')
    .get(getClients)
    .post(addNewClient);

    app.route('/clients/:clientId')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);
};

export default clientsRouter;