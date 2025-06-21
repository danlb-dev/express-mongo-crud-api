import { Express } from 'express';
import { 
    addNewOrder, 
    getOrders, 
    getOrderById, 
    updateOrder, 
    deleteOrder
} from '../controllers/v1/order.controller';

const ordersRouter = (app: Express) => {
    app.route('/api/v1/orders')
    .get(getOrders)
    .post(addNewOrder);

    app.route('/api/v1/orders/:orderId')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);
};

export default ordersRouter;