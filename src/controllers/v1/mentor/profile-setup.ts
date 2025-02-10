import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import Mentor from '../../../models/mentor.model.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import User from '../../../models/user.model.js';

export const profileSetup = asyncHandler(async (req: Request, res: Response) => {
    const { userId, currentCourses, skills } = req.body;

    const user = await User.findById(userId);
    if (user?.role !== 'mentor') {
        throw new ApiError(400, 'User is not a mentor');
    }

    if (currentCourses.length < 1 || skills.length < 1) {
        throw new ApiError(400, 'Please provide at least one course and skill');
    }

    const mentor = (await Mentor.create({ _id: userId, currentCoursesAssigned: currentCourses, skills })).populate(
        'currentCoursesAssigned'
    );

    if (!mentor) {
        throw new ApiError(500, 'Error Occured While Creating Mentor in Database');
    }

    return res.status(200).json(new ApiResponse(200, 'Mentor profile setup successful', mentor));
});
