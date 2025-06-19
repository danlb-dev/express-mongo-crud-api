import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import clientsRouter from './routes/client.route';
import productsRouter from './routes/product.route';
import ordersRouter from './routes/order.route';
import bodyParser from 'body-parser';

const app: Express = express();
const DatabaseName = "crm_dev_db";
const PORT = 3200;

// Connecting app to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${DatabaseName}`)
        .then(() => console.log("Connected to MongoDB!"));

// BodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Serve API docs
const openapiSpec = yaml.load('./openapi.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Adding routers
app.use('/clients', clientsRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Redirecting root to swagger
app.get("/", (req: Request, res: Response) => {
    res.redirect('/swagger');
});

// Starting server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});