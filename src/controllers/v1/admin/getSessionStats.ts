import { Request, Response } from 'express';
import asyncHandler from '../../../utils/AsyncHandler.js';
import ApiResponse from '../../../utils/ApiResponse.js';
import Session from '../../../models/sessions.model.js';

export const getSessionStats = asyncHandler(async (req: Request, res: Response) => {
    // write a aggregate query to get the total number of sessions, counts of sessions based on roles and counts of sessions based on status
    const sessionTypes = ['ec-connect', 'ia-connect', 'leadership-connect', 'mentor-connect'];
    const status = ['pending', 'approved', 'cancel'];
    const sessions = await Session.aggregate([
        {
            $group: {
                _id: null,
                totalSessions: { $sum: 1 },
                averageSessionDuration: {
                    $avg: {
                        $divide: [
                            {
                                $abs: {
                                    $subtract: [{ $toDate: '$endTime' }, { $toDate: '$startTime' }],
                                },
                            },
                            1000 * 60,
                        ],
                    },
                },
                sessionCountByType: { $push: '$type' },
                sessionCountByStatus: { $push: '$status' },
            },
        },
        {
            $project: {
                _id: 0,
                totalSessions: 1,
                averageSessionDuration: {
                    $concat: [{ $toString: { $round: ['$averageSessionDuration', 0] } }, ' min'],
                },

                // Create role count object from predefined roles array
                sessionCountByType: {
                    $arrayToObject: {
                        $map: {
                            input: sessionTypes, // Use predefined roles
                            as: 'type',
                            in: {
                                k: '$$type',
                                v: {
                                    $size: {
                                        $filter: {
                                            input: '$sessionCountByType',
                                            as: 'r',
                                            cond: { $eq: ['$$r', '$$type'] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                sessionCountByStatus: {
                    $arrayToObject: {
                        $map: {
                            input: status, // Use predefined statuses
                            as: 'status',
                            in: {
                                k: '$$status',
                                v: {
                                    $size: {
                                        $filter: {
                                            input: '$sessionCountByStatus',
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

    res.status(200).json(new ApiResponse(200, 'Stats found', sessions[0]));
});
