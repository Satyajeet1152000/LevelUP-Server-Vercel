import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import User from '../../../models/user.model.js';

export const getUserStats = asyncHandler(async (req: Request, res: Response) => {
    // write a aggregate query to get the total number of users, counts of users based on roles and counts of users based on status
    const roles = ['user', 'student', 'mentor', 'admin', 'superAdmin'];
    const status = ['pending', 'verified', 'banned'];
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                totalUsers: { $sum: 1 },
                userCountByRole: { $push: '$role' },
                userCountByStatus: { $push: '$status' },
            },
        },
        {
            $project: {
                _id: 0,
                totalUsers: 1,

                // Create role count object from predefined roles array
                userCountByRole: {
                    $arrayToObject: {
                        $map: {
                            input: roles, // Use predefined roles
                            as: 'role',
                            in: {
                                k: '$$role',
                                v: {
                                    $size: {
                                        $filter: {
                                            input: '$userCountByRole',
                                            as: 'r',
                                            cond: { $eq: ['$$r', '$$role'] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                userCountByStatus: {
                    $arrayToObject: {
                        $map: {
                            input: status, // Use predefined statuses
                            as: 'status',
                            in: {
                                k: '$$status',
                                v: {
                                    $size: {
                                        $filter: {
                                            input: '$userCountByStatus',
                                            as: 's',
                                            cond: { $eq: ['$$s', '$$status'] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    ]);

    res.status(200).json(new ApiResponse(200, 'Stats found', users[0]));
});
