import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import User from '../../../models/user.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const adminUserApproval = asyncHandler(async (req: Request, res: Response) => {
    const { userId, status, role } = req.body;

    if (!userId || !status || !role) {
        throw new ApiError(400, 'User ID and Status is required');
    }

    // Update the user status to approved
    const user = await User.findByIdAndUpdate(userId, { status, role }, { new: true }).select('_id name email status role');

    if (!user) {
        throw new ApiError(400, 'User not found');
    }

    return res.status(200).json(new ApiResponse(200, 'User approval successful', user));
});
