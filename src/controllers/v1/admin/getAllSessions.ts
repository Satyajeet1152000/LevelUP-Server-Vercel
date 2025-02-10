import { Request, Response } from 'express';
import Session from '../../../models/sessions.model.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const getAllSessions = asyncHandler(async (req: Request, res: Response) => {
    const { skip, limit } = req.query;

    const page = parseInt(skip as string) || 0;
    const limitValue = parseInt(limit as string) || 10;
    const skipValue = page * limitValue;

    const sessions = await Session.find().skip(skipValue).limit(limitValue);

    if (!sessions || sessions.length === 0) {
        throw new ApiError(404, 'No sessions found');
    }

    return res.status(200).json(new ApiResponse(200, 'Sessions found', sessions));
});
