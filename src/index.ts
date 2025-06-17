import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';


const app: Express = express();
const PORT: number = 3200;

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req: Request, resp: Response) => {
    resp.redirect('/swagger');
});

app.listen(3200, (e: any)=> {
    console.log(`Server is running at port ${PORT}`);
});