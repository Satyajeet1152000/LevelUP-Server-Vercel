import { Request, Response } from 'express';
import Course from '../../../models/course.model.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';

export const updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const { courseName, category } = req.body;

    if (!courseName && !category) {
        throw new ApiError(400, 'Course name and category are required');
    }

    // Find the course by ID
    const course = await Course.findByIdAndUpdate(courseId, { courseName, category }, { new: true });
    if (!course) {
        throw new ApiError(404, 'Course not found');
    }

    return res.status(200).json(new ApiResponse(200, 'Course updated successfully.', course));
});
