import { Router } from 'express';
import LoginAuthentication from '../../services/login-authentication.js';
import db from '../../models/index.cjs';

const hrDashboardRouter = Router();
hrDashboardRouter.route('/')
  .get(async (req, res, next) => {
    const attendance = await db.attendances.findOne({
      where: {
        userId: req.session.user.id,
        date: new Date(),
      },
    });
    let loginTime;
    let logoutTime;
    if (attendance) {
      loginTime = attendance.loginTime;
      logoutTime = attendance.logoutTime;
    }
    const attendances = await db.attendances.findAll({
      where: {
        userId: req.session.user.id,
      },
      attributes: ['date'],
    });
    const dates = [];
    attendances.forEach((attendance) => {
      attendance.date.substring(5, 7) == (new Date()).getMonth() + 1 ? dates.push(parseInt(attendance.date.slice(-2))) : null;
    });
    if (!loginTime) { loginTime = 'not signed in'; }
    if (!logoutTime) { logoutTime = 'not signed out'; }
    res.render('hr-dashboard', {
      id: req.session.user.id,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      dateOfBirth: req.session.user.dateOfBirth,
      email: req.session.user.email,
      signIn: loginTime,
      signOut: logoutTime,
      dates,
    });
  });
export default hrDashboardRouter;
