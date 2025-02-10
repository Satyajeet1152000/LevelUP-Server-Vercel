import { Request, Response } from 'express';
import User from '../../../models/user.model.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { skip, limit } = req.query;

    const page = parseInt(skip as string) || 0;
    const limitValue = parseInt(limit as string) || 10;
    const skipValue = page * limitValue;

    const users = await User.find().skip(skipValue).limit(limitValue);

    if (!users || users.length === 0) {
        throw new ApiError(404, 'No users found');
    }

    return res.status(200).json(new ApiResponse(200, 'Users found', users));
});
