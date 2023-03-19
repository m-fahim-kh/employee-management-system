import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../../models/index.cjs';

const adminAddHrRouter = Router();

adminAddHrRouter.route('/hr')
  .get(async (req, res, next) => {
    res.render('admin-add-hr', { firstName: req.session.user.firstName, message: '' });
  })
  .all(bodyParser.urlencoded())
  .post(async (req, res, next) => {
    if (await db.users.findOne({
      where: { username: req.body.username },
    })) {
      res.render('admin-add-hr', { firstName: req.session.user.firstName, message: 'username is taken' });
    } else if (await db.users.findOne({
      where: { email: req.body.email },
    })) {
      res.render('admin-add-hr', { firstName: req.session.user.firstName, message: 'email is registered' });
    } else if (req.body.firstName === '' || req.body.lastName === '' || req.body.dateOfBirth === '') {
      res.render('admin-add-hr', { firstName: req.session.user.firstName, message: 'fields cannot be empty' });
    } else {
      const user = await db.users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
        userId: req.session.user.id,
        roleId: (await db.roles.findOne({
          where: {
            name: 'hr',
          },
        })).id,
      });
      res.render('admin-add-hr', { firstName: req.session.user.firstName, message: 'user added to db' });
    }
  });
export default adminAddHrRouter;
