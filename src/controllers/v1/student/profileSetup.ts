import { Request, Response } from 'express';
import Student from '../../../models/student.model.js';
import ApiError from '../../../utils/ApiError.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import User from '../../../models/user.model.js';

// Create or Update Student Profile
const profileSetup = asyncHandler(async (req: Request, res: Response) => {
    const { userId, studentCode, currentCourses, skills } = req.body;

    const user = await User.findById(userId);
    if (user?.role !== 'student') {
        throw new ApiError(400, 'User is not a student');
    }

    if (currentCourses.length < 1 || skills.length < 1) {
        throw new ApiError(400, 'Please provide at least one course and skill');
    }

    const student = (await Student.create({ _id: userId, studentCode, currentCourses, skills })).populate('currentCourses');

    if (!student) {
        throw new ApiError(500, 'Error Occured While Creating Student in Database');
    }

    return res.status(200).json(new ApiResponse(200, 'Student profile setup successful', student));
});
export default profileSetup;
