import express from 'express';
import { profileSetup } from '../controllers/v1/mentor/profile-setup.js';
import profileSetupValidation from '../validators/mentor/profile-setup.validator.js';
import handleValidationErrors from '../middlewares/validationErrorHandlert.js';
import { sessionApprove } from '../controllers/v1/mentor/session-approve.js';
import { getPastSession } from '../controllers/v1/mentor/get-past-session.js';
import { updateProfile } from '../controllers/v1/mentor/update-profile.js';
import { createSlot } from '../controllers/v1/mentor/create-slots.js';
import { getProfile } from '../controllers/v1/mentor/get-profile.js';
import { getUpcommingSessions } from '../controllers/v1/mentor/get-upcomming-sessions.js';

const mentorRoute = express.Router();

mentorRoute.post('/profile-setup', profileSetupValidation, handleValidationErrors, profileSetup);
mentorRoute.get('/get-profile/:userId', getProfile);
mentorRoute.post('/update-profile/:mentorId', updateProfile);
mentorRoute.post('/create-slot/:mentorId', createSlot);
mentorRoute.get('/get-upcoming-sessions/:mentorId', getUpcommingSessions);
mentorRoute.put('/session-approve/:mentorId', sessionApprove);
mentorRoute.get('/get-past-session/:mentorId', getPastSession);

export default mentorRoute;
