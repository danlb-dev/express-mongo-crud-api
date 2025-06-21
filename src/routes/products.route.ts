import { Express } from 'express';
import { 
    addNewProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct
} from '../controllers/v1/product.controller';

const productsRouter = (app: Express) => {
    app.route('/api/v1/products')
    .get(getProducts)
    .post(addNewProduct);

    app.route('/api/v1/products/:productId')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);
};

export default productsRouter;