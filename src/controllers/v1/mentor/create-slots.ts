import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import Mentor from '../../../models/mentor.model.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';

export const createSlot = asyncHandler(async (req: Request, res: Response) => {
    const { slots } = req.body;
    const { mentorId } = req.params;

    if (!mentorId) {
        throw new ApiError(400, 'Mentor ID is required');
    }

    if (!slots || slots.length === 0) {
        throw new ApiError(400, 'Please provide at least one slot');
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        throw new ApiError(400, 'Mentor not found');
    }

    mentor.slots.push(...slots);
    await mentor.save({ validateBeforeSave: false });

    res.status(200).json(new ApiResponse(200, 'Slots created successfully'));
});
