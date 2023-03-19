import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../../models/index.cjs';

const adminDashboardRouter = Router();

adminDashboardRouter.route('/')
  .get(async (req, res, next) => {
    const users = await db.users.findAll({
      attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'roleId'],
      include: db.roles,
    });
    res.render('admin-dashboard', { firstName: req.session.user.firstName, users });
  });

export default adminDashboardRouter;
