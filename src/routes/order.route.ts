import { Express } from 'express';
import { 
    addNewOrder, 
    getOrders, 
    getOrderById, 
    updateOrder, 
    deleteOrder
} from '../controllers/order.controller';

const ordersRouter = (app: Express) => {
    app.route('/order')
    .get(getOrders)
    .post(addNewOrder);

    app.route('/order/:orderId')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder);
};

export default ordersRouter;