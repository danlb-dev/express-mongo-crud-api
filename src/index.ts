import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import bodyParser from 'body-parser';
import config from './config/config';
import customErrorHandler from './middleware/errorHandler';
import clientsRouter from './routes/clients.route';
import productsRouter from './routes/products.route';
import ordersRouter from './routes/orders.route';

const HOST = config.host;
const PORT = config.port;
const DB_HOST = config.db_host;
const DB_NAME = config.db_name;

const app: Express = express();

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`${DB_HOST}${DB_NAME}`)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Swagger
const openapiSpec = yaml.load('./openapi.yaml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Routes
clientsRouter(app);
productsRouter(app);
ordersRouter(app);

// Redirect Root to Swagger
app.get("/", (req: Request, res: Response) => {
    res.redirect('/swagger');
});

// Handle Unknown Routes
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use(customErrorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});