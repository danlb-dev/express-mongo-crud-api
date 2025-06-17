import { Express } from 'express';
import { 
    addNewProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct
} from '../controllers/product.controller';

const productsRouter = (app: Express) => {
    app.route('/product')
    .get(getProducts)
    .post(addNewProduct);

    app.route('/product/:productId')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);
};

export default productsRouter;