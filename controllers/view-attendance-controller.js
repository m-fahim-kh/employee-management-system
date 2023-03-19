import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../models/index.cjs';

const viewAttendanceRouter = Router();

viewAttendanceRouter.route('/attendance/:page')
  .all(async (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  })
  .get(async (req, res, next) => {
    if (req.params.page <= 0) {
      req.params.page = 1;
    }
    const attendances = await db.attendances.findAll(
      {
        where: {
          userId: req.session.user.id,
        },
        limit: 5,
        order: [['date', 'DESC']],
        offset: (req.params.page - 1) * 5,
      },
    );
    res.render('employee-attendance', {
      attendances,
      page: parseInt(req.params.page),
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
    });
  });

export default viewAttendanceRouter;
