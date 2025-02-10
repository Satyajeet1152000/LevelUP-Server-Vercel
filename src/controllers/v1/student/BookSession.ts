import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiError from '../../../utils/ApiError.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import Session from '../../../models/sessions.model.js';
// import User from '../../../models/user.model.js';
import Student from '../../../models/student.model.js';
import mongoose from 'mongoose';
import Mentor from '../../../models/mentor.model.js';

const BookSession = asyncHandler(async (req: Request, res: Response) => {
    //    studentId, mentorId, courseId, title, description, joinee's emails[], startTime, endTime
    // const { studentId, mentorId, courseId, title, description, sessionType, joinees, startTime, endTime } = req.body;
    const { studentId, mentorId, courseId, title, description, sessionType, startTime, endTime } = req.body;

    // console.log(joinees);
    // const data = await User.find({
    //     email: { $in: joinees },
    // }).select('_id');

    // const joineesArray = data.map((user) => {
    //     return { userId: user._id };
    // });
    // console.log(joineesArray)
    const joineesArray = [{ userId: studentId }];
    const sessionMembers = {
        host: {
            userId: mentorId,
        },
        joinee: joineesArray,
    };
    const session = await Session.create({
        courseId,
        title,
        description,
        type: sessionType,
        startTime,
        endTime,
        sessionMembers,
    });

    if (!session) {
        throw new ApiError(500, 'Error Occured While Creating Session in Database');
    }

    console.log(session._id);

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
        throw new ApiError(404, `Mentor not Found with this Id ${mentorId}`);
    }
    mentor.bookedSessions.push(session._id as mongoose.Types.ObjectId);
    await mentor.save({ validateBeforeSave: false });

    const student = await Student.findById(studentId);
    if (!student) {
        throw new ApiError(404, `Student not Found with this Id ${studentId}`);
    }
    student.bookedSessions.push(session._id as mongoose.Types.ObjectId);
    await student.save({ validateBeforeSave: false });

    // joineesArray.forEach(async (joinee) => {
    //     const student = await Student.findById(joinee.userId);
    //     if (!student) {
    //         throw new ApiError(404, `User not Found with this Email ${joinee.userId}`);
    //     }
    //     student.bookedSessions.push(session._id as mongoose.Types.ObjectId);
    //     await student.save({ validateBeforeSave: false });
    // });

    return res.status(200).json(new ApiResponse(200, 'Session Created SuccessFully'));
});

export default BookSession;
