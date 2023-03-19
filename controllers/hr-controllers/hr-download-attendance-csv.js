import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../../models/index.cjs';

const hrDownloadAttendanceCSVRouter = Router();

hrDownloadAttendanceCSVRouter.route('/user/:id')
  .get(async (req, res, next) => {
    const attendances = await db.attendances.findAll(
      {
        where: {
          userId: req.params.id,
        },
      },
    );
    res.set('Content-type', 'text/csv');
    attendances.forEach((attendance) => {
      res.write(`${attendance.date},${attendance.loginTime},${attendance.logoutTime}\n`);
    });
    res.end();
  });

export default hrDownloadAttendanceCSVRouter;
