// External dependencies
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import bodyParser from 'body-parser';

// Internal modules
import clientsRouter from './routes/clients.route';
import productsRouter from './routes/products.route';
import ordersRouter from './routes/orders.route';

const app: Express = express();
const PORT = process.env.PORT || 3200;
const DB_HOST = 'mongodb://localhost/';
const DB_NAME = 'crm_dev_db';

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`${DB_HOST}${DB_NAME}`)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Swagger documentation
const openapiSpec = yaml.load('./openapi.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Route registration
clientsRouter(app);
productsRouter(app);
ordersRouter(app);

// Redirect root to Swagger UI
app.get("/", (req: Request, res: Response) => {
    res.redirect('/swagger');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});