import { Router } from 'express';
import LoginAuthentication from '../../services/login-authentication.js';
import db from '../../models/index.cjs';

const hrViewUserListRouter = Router();
hrViewUserListRouter.route('/users')
  .get(async (req, res, next) => {
    const users = await db.users.findAll({
      where: {
        userId: req.session.user.id,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'username'],
    });
    res.render('hr-view-users', {
      firstName: req.session.user.firstName,
      lastname: req.session.user.lastName,
      username: req.session.user.username,
      id: req.session.user.id,
      email: req.session.user.email,
      users,
    });
  });
export default hrViewUserListRouter;
