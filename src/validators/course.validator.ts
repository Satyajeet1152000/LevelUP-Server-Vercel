import { body } from 'express-validator';

const courseValidation = [
    body('courseName')
        .trim()
        .notEmpty()
        .withMessage('Course name is required')
        .bail()
        .isString()
        .withMessage('Course name must be a string'),

    body('category')
        .notEmpty()
        .withMessage('Category is required')
        .bail()
        .isIn(['coding', 'dsa', 'csbt'])
        .withMessage("Category must be one of ['coding', 'dsa', 'csbt']"),
];

export default courseValidation;
