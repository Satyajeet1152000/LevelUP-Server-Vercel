import { body } from 'express-validator';

const profileSetupValidation = [
    body('userId')
        .isString()
        .withMessage('Mentor ID is required')
        .bail()
        .isLength({ min: 1 })
        .withMessage('Invalid mentor ID'),

    body('currentCourses')
        .isArray()
        .withMessage('Current courses is required')
        .bail()
        .isLength({ min: 1 })
        .withMessage('Invalid current courses'),

    body('skills').isArray().withMessage('Skills is required').bail().isLength({ min: 1 }).withMessage('Invalid skills'),
];

export default profileSetupValidation;
