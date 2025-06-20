import { Request, Response, NextFunction } from 'express';

const customErrorHandler = (
    err: { statusCode?: number, name?: string, message?: string }, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    let statusCode = err.statusCode ?? 500;
    if(err.name == 'ValidationError'){
        statusCode = 400;
    }

    const message = err.message ?? 'Internal Server Error';
    res.status(statusCode).json({ error: err.name, message: message });
}

export default customErrorHandler;