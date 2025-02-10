import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import Mentor from '../../../models/mentor.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const mentor = await Mentor.findById(userId)
        .populate({
            path: 'currentCoursesAssigned',
            select: 'courseId courseName category',
        })
        .populate({
            path: '_id',
            select: 'name email phoneNumber, avatar role status',
        });

    if (!mentor) {
        throw new Error('Mentor not found');
    }

    return res.status(200).json(new ApiResponse(200, 'Mentor profile found', mentor));
});
