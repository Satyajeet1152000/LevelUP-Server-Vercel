import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import User from '../../../models/user.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const updateRoleAndSubRole = asyncHandler(async (req: Request, res: Response) => {
    const { userId, role } = req.body;

    if (!userId || !role) {
        throw new ApiError(400, 'User ID and Role is required');
    }

    // Update the user role and subRole
    const user = await User.findByIdAndUpdate(userId, { $set: { role } });

    if (!user) {
        throw new ApiError(400, 'User not found');
    }

    return res.status(200).json(new ApiResponse(200, 'User role and subRole updated successfully', user));
});
