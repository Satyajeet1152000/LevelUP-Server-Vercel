import { Request, Response } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
export const getCourses = asyncHandler(async (_req: Request, res: Response) => {
    // Fetch all courses from the database
    const courses = await Course.find();

    if (!courses || courses.length === 0) {
        throw new ApiError(404, 'No Course Found');
    }

    return res.status(200).json(new ApiResponse(200, 'Courses retrieved successfully.', courses));
});
