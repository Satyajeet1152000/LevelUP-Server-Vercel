import { Request, Response } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';

export const getCoursesByCategory = asyncHandler(async (req: Request, res: Response) => {
    const { category } = req.params;

    if (!category) {
        throw new ApiError(400, 'Category is required.');
    }

    const courses = await Course.find({ category });

    if (!courses || courses.length === 0) {
        throw new ApiError(404, 'No courses found for the selected category.');
    }

    return res.status(200).json(new ApiResponse(200, 'Courses retrieved successfully.', courses));
});
