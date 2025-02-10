import { body } from 'express-validator';

// userId, studentCode, currentCourses, skills
const profileSetupValidator = [
    body('userId').notEmpty().withMessage('UserId required'),
    body('studentCode').notEmpty().withMessage('student Code required'),

    body('currentCourses').notEmpty().withMessage('current courses required'),

    body('skills').notEmpty().withMessage('skills requierd'),
];

export default profileSetupValidator;
