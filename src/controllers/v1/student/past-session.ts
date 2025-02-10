import { Request, Response } from 'express';
import Student from '../../../models/student.model.js';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import Session from '../../../models/sessions.model.js';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
        role: string;
    };
}

const pastSession = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { studentId } = req.params;
    const { skip, limit } = req.query;

    const page = parseInt(skip as string) || 0;
    const limitValue = parseInt(limit as string) || 10;
    const skipValue = page * limitValue;

    if (!studentId) {
        throw new ApiError(400, 'Student ID is required');
    }

    const student = await Student.findById(studentId);
    if (!student) {
        throw new ApiError(400, 'Student not found');
    }

    const studentID = new mongoose.Types.ObjectId(studentId);
    const pastSessions = await Session.aggregate([
        {
            $match: {
                'sessionMembers.joinee.userId': studentID,
                endTime: { $lt: new Date() },
            },
        },
        {
            $project: {
                title: 1,
                type: 1,
                sessionMembers: 1,
                recordingSrc: 1,
                courseId: 1,
                startTime: 1,
                endTime: 1,
                status: 1,
            },
        },
        {
            $skip: skipValue,
        },
        {
            $limit: limitValue,
        },
    ]);

    if (!pastSessions || pastSessions.length === 0) {
        throw new ApiError(400, 'No past sessions found');
    }

    return res.status(200).json(new ApiResponse(200, 'Past sessions found', pastSessions));
});

export default pastSession;
