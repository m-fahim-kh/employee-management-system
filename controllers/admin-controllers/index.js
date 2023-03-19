import { Router } from 'express';
import LoginAuthentication from '../../services/login-authentication.js';
import adminAddHrRouter from './admin-add-hr.js';
import adminDashboardRouter from './admin-dashboard.js';
import adminDeleteUserRouter from './admin-delete-user.js';

const adminRouter = Router();
adminRouter.use(LoginAuthentication.adminCheck);
adminRouter.use(adminDashboardRouter);
adminRouter.use(adminDeleteUserRouter);
adminRouter.use(adminAddHrRouter);
export default adminRouter;
