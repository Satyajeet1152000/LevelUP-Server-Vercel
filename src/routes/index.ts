import express from 'express';
import authRoute from './auth.route.js';
import studentRoute from './student.route.js';
import mentorRoute from './mentor.route.js';
import adminRoute from './admin.route.js';
import courseRoute from './course.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/student', studentRoute);
router.use('/mentor', mentorRoute);
router.use('/admin', adminRoute);
router.use('/course', courseRoute);

export default router;
