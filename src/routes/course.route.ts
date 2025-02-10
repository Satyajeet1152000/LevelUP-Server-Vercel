import express from 'express';
import courseValidation from '../validators/course.validator.js';
import handleValidationErrors from '../middlewares/validationErrorHandlert.js';
import { getCourses } from '../controllers/v1/course/get-all-courses.js';
import { getCoursesByCategory } from '../controllers/v1/course/get-course-by-category.js';
import { createCourse } from '../controllers/v1/course/create-course.js';
import { updateCourse } from '../controllers/v1/course/update-course.js';
import { deleteCourse } from '../controllers/v1/course/delete-course.js';

const courseRoute = express.Router();

courseRoute.post('/create-course', courseValidation, handleValidationErrors, createCourse);
courseRoute.get('/get-all-courses', getCourses);
courseRoute.get('/get-course-by-category/:category', getCoursesByCategory);
courseRoute.put('/update-course/:courseId', courseValidation, handleValidationErrors, updateCourse);
courseRoute.delete('/delete-course/:courseId', deleteCourse);

export default courseRoute;
