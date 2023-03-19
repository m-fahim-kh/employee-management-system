import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../../models/index.cjs';

const adminDeleteUserRouter = Router();

adminDeleteUserRouter.route('/user/:id')
  .get(async (req, res, next) => {
    const deleteUser = await db.users.destroy({ where: { id: parseInt(req.params.id) } });
    const users = await db.users.findAll({
      attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'roleId'],
      include: db.roles,
    });
    res.render('admin-dashboard', { firstName: req.session.user.firstName, users });
  });

export default adminDeleteUserRouter;
