import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../../models/index.cjs';

const hrAttendanceRouter = Router();

hrAttendanceRouter.route('/signin')
  .get(async (req, res, next) => {
    const userId = req.session.user.id;
    let attendance = await db.attendances.findOne({
      where: {
        date: new Date(),
        userId,
      },
    });
    if (attendance === null) {
      attendance = await db.attendances.create({
        userId,
        date: new Date(),
        loginTime: new Date().toTimeString().substring(0, 8),
      });
    } else if (attendance.loginTime === null) {
      attendance.loginTime = new Date().toTimeString().substring(0, 8);
    }
    const attendances = await db.attendances.findAll({
      where: {
        userId: req.session.user.id,
      },
      attributes: ['date'],
    });
    const dates = [];
    attendances.forEach((attendance) => {
      attendance.date.substring(5, 7) == (new Date()).getMonth() + 1 ? dateArray.push(parseInt(attendance.date.slice(-2))) : null;
    });
    res.render('hr-dashboard', {
      id: req.session.user.id,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      dateOfBirth: req.session.user.lastName,
      email: req.session.user.email,
      signIn: attendance.loginTime,
      signOut: attendance.logoutTime ? attendance.logoutTime : 'not signed out',
      dates,
    });
  });
hrAttendanceRouter.route('/signout')
  .get(async (req, res, next) => {
    const userId = req.session.user.id;
    let attendance = await db.attendances.findOne({
      where: {
        date: new Date(),
        userId,
      },
    });
    if (attendance === null) {
      attendance = await db.attendances.create({
        userId,
        date: new Date(),
        loginTime: new Date().toTimeString().substring(0, 8),
        logoutTime: new Date().toTimeString().substring(0, 8),
      });
    } else {
      attendance.loginTime = (attendance.loginTime ? attendance.loginTime : new Date().toTimeString().substring(0, 8));
      attendance.logoutTime = (attendance.logoutTime ? attendance.logoutTime : new Date().toTimeString().substring(0, 8));
      await attendance.save();
    }
    const attendances = await db.attendances.findAll({
      where: {
        userId: req.session.user.id,
      },
      attributes: ['date'],
    });
    const dateArray = [];
    attendances.forEach((attendance) => {
      attendance.date.substring(5, 7) == (new Date()).getMonth() + 1 ? dateArray.push(parseInt(attendance.date.slice(-2))) : null;
    });
    res.render('hr-dashboard', {
      id: req.session.user.id,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      dateOfBirth: req.session.user.lastName,
      email: req.session.user.email,
      signIn: (attendance.loginTime ? attendance.loginTime : 'not signed in'),
      signOut: (attendance.logoutTime ? attendance.logoutTime : 'not signed out'),
      dateArray,
    });
  });
export default hrAttendanceRouter;
