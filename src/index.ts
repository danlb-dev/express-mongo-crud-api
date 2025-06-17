import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT: number = 3200;

app.get('/', (req: Request, resp: Response) => {
    resp.send(`The  express server is running at port: ${PORT}`);
});

app.listen(3200, (e: any)=> {
    console.log(`Server is running at port ${PORT}`);
});