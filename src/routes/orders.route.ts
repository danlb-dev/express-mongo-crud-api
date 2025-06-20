import { Express } from 'express';
import { 
    addNewOrder, 
    getOrders, 
    getOrderById, 
    updateOrder, 
    deleteOrder
} from '../controllers/order.controller';

const ordersRouter = (app: Express) => {
    app.route('/orders')
    .get(getOrders)
    .post(addNewOrder);

    app.route('/orders/:orderId')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);
};

export default ordersRouter;