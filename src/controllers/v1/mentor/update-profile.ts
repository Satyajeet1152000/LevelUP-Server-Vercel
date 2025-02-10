import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import Mentor from '../../../models/mentor.model.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { mentorId } = req.params;

    const mentor = await Mentor.findByIdAndUpdate(mentorId, req.body, { new: true });
    if (!mentor) {
        throw new ApiError(400, 'Mentor not found');
    }

    res.status(200).json(new ApiResponse(200, 'Mentor profile updated successfully', mentor));
});
