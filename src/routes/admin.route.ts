import { Router } from 'express';
import { adminUserApproval } from '../controllers/v1/admin/user-approval.js';
import { updateRoleAndSubRole } from '../controllers/v1/admin/update-role-and-subrole.js';
import { getpendingResponse } from '../controllers/v1/admin/pendingUserList.js';
import { getAllUsers } from '../controllers/v1/admin/getAllUsers.js';
import { getAllSessions } from '../controllers/v1/admin/getAllSessions.js';
import { getUserStats } from '../controllers/v1/admin/getUserStats.js';
import { getSessionStats } from '../controllers/v1/admin/getSessionStats.js';

const adminRoute = Router();

adminRoute.get('/get-all-users', getAllUsers);
adminRoute.get('/get-all-sessions', getAllSessions);
adminRoute.get('/pending-user-list', getpendingResponse);
adminRoute.post('/user-approval', adminUserApproval);
adminRoute.post('/update-role-and-sub-role', updateRoleAndSubRole);
adminRoute.get('/get-user-stats', getUserStats);
adminRoute.get('/get-session-stats', getSessionStats);

export default adminRoute;
