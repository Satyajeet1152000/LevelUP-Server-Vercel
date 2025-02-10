import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import Mentor from '../../../models/mentor.model.js';
import mongoose from 'mongoose';

export const getSlotsByCourse = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.params;

    if (!courseId) {
        throw new ApiError(400, 'Course ID is required');
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const slots = await Mentor.aggregate([
        {
            $match: {
                currentCoursesAssigned: courseObjectId,
            },
        },
        {
            $addFields: {
                currentSlots: {
                    $filter: {
                        input: '$slots',
                        as: 'slot',
                        cond: {
                            $and: [
                                {
                                    $eq: ['$$slot.isBooked', false],
                                },
                                {
                                    $gt: ['$$slot.startTime', new Date()],
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'mentor',
            },
        },
        {
            $unwind: {
                path: '$mentor',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 1,
                name: '$mentor.name',
                avatar: '$mentor.avatar',
                currentSlots: 1,
                skills: 1,
            },
        },
    ]);

    if (!slots || slots.length === 0) {
        throw new ApiError(400, 'No slots found');
    }

    return res.status(200).json(new ApiResponse(200, 'Slots found', slots));
});
