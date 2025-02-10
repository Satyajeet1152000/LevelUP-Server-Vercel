import logger from '../config/logger.js';
import { NextFunction, Request, Response } from 'express';
import ApiError from './ApiError.js';

const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ApiError) {
        logger.error({
            message: err.message,
            statusCode: err.statusCode,
            errors: err.errors,
            stack: err.stack,
            path: req.originalUrl,
            method: req.method,
        });

        return res.status(err.statusCode || 500).json({
            message: err.message || 'something went wrong',
            statusCode: err.statusCode,
            errors: err.errors,
            success: false,
        });
    }

    logger.error({
        message: err.message || 'Internal Server Error',
        stack: err.stack || '',
        path: req.originalUrl,
        method: req.method,
    });

    return res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

export default errorHandler;
