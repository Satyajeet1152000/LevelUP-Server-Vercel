import { Request, Response } from 'express';
import Student from '../../../models/student.model.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiResponse from '../../../utils/ApiResponse.js';

const getStudentProfile = asyncHandler(async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId)
        .populate({
            path: 'currentCourses',
            select: 'courseId courseName category',
        })
        .populate({
            path: '_id',
            select: 'name email phoneNumber, avatar role status',
        });

    if (!student) {
        throw new ApiError(400, 'Student not found');
    }

    return res.status(200).json(new ApiResponse(200, 'Student profile found', student));
});

export default getStudentProfile;
