import { body } from 'express-validator';

const bookSessionValidator = [
    body('studentId').notEmpty().withMessage('student Id required'),

    body('mentorId').notEmpty().withMessage('mentorId required'),

    body('courseId').notEmpty().withMessage('courseId required'),

    body('title').notEmpty().withMessage('title required'),

    body('description').notEmpty().withMessage('description required'),

    body('sessionType')
        .isIn(['ec-connect', 'ia-connect', 'leadership-connect', 'mentor-connect'])
        .withMessage('Invalid session type'),
    body('joinees')
        .isArray()
        .withMessage('Emails must be an array')
        .custom((emails) => {
            if (emails.length > 0) {
                for (const email of emails) {
                    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
                        throw new Error('Each item in the emails array must be a valid email');
                    }
                }
            }
            return true;
        }),

    // body('startTime').notEmpty().withMessage('startTime required').bail().isDate().withMessage('Invalid start time format'),
    // body('endTime').notEmpty().withMessage('endTime required').bail().isDate().withMessage('Invalid end time format'),
];

export default bookSessionValidator;
