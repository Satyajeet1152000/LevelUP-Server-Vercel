import { Request, Response } from 'express';
import User from '../../../models/user.model.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const getpendingResponse = asyncHandler(async (req: Request, res: Response) => {
    const pendingUsers = await User.find({ status: 'pending' }).select('_id name email status').lean();

    if (!pendingUsers.length) {
        throw new ApiError(404, 'No pending request found');
    }

    return res.status(200).json(new ApiResponse(200, 'Pending users found', pendingUsers));
});
