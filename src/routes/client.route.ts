import { Express } from 'express';
import { 
    addNewClient, 
    getClients, 
    getClientById, 
    updateClient, 
    deleteClient 
} from '../controllers/client.controller';

const clientsRouter = (app: Express) => {
    app.route('/client')
    .get(getClients)
    .post(addNewClient);

    app.route('/client/:clientId')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);
};

export default clientsRouter;