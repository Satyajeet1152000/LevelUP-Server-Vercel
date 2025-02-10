import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import Session from '../../../models/sessions.model.js';
import Mentor from '../../../models/mentor.model.js';

export const sessionApprove = asyncHandler(async (req: Request, res: Response) => {
    const { sessionId, sessionStatus, sessionJoinLink } = req.body;
    const { mentorId } = req.params;

    if (!sessionId || !sessionStatus || !mentorId || !sessionJoinLink) {
        throw new ApiError(400, 'Session ID, Session Status, Mentor ID and Session Join Link are required');
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        throw new ApiError(400, 'Mentor not found');
    }

    const session = await Session.findById(sessionId);
    if (!session) {
        throw new ApiError(400, 'Session not found');
    }
    session.status = sessionStatus;
    session.sessionJoinLink = sessionJoinLink;
    await session.save({ validateBeforeSave: false });

    mentor.bookedSessions.push(sessionId);
    await mentor.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, 'Session approved successfully'));
});
