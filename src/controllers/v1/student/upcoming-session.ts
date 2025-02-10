import { Request, Response } from 'express';
import Student from '../../../models/student.model.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

const upcomingSessions = asyncHandler(async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate({
        path: 'bookedSessions',
        model: 'Session',
        select: '_id title description type sessionJoinLink courseId sessionMembers startTime endTime',
        match: {
            status: 'approved',
            startTime: {
                $gte: new Date(),
            },
        },
    });

    if (!student) {
        throw new ApiError(400, 'Student not found');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, 'Upcoming sessions (ongoing and future) retrieved successfully.', student));
});

export default upcomingSessions;
