import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

// Routes
import clientsRouter from './routes/client.route';
import productsRouter from './routes/product.route';
import ordersRouter from './routes/order.route';

const app: Express = express();
const PORT = 3200;

// Serve static files
app.use(express.static("public"));

// Serve API docs
const openapiSpec = yaml.load('./openapi.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Attach routers
app.use('/clients', clientsRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Redirect root to swagger
app.get("/", (req: Request, res: Response) => {
    res.redirect('/swagger');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});