import { Router } from 'express';
import bodyParser from 'body-parser';
import db from '../models/index.cjs';

const registerHrRouter = Router();
registerHrRouter.route('/register')
  .get(async (req, res, next) => {
    res.render('register-page', { message: '' });
  })
  .all(bodyParser.urlencoded({ extended: true }))
  .post(async (req, res, next) => {
    if (await db.users.findOne({
      where: { username: req.body.username },
    })) {
      res.render('register-page', { message: 'username is taken' });
    } else if (await db.users.findOne({
      where: { email: req.body.email },
    })) {
      res.render('register-page', { message: 'email is registered' });
    } else if (req.body.firstName === '' || req.body.lastName === '' || req.body.dateOfBirth === '') {
      res.render('register-page', { message: 'fields cannot be empty' });
    } else {
      const user = await db.users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
        roleId: (await db.roles.findOne({
          where: {
            name: 'hr',
          },
        })).id,
      });
      res.render('register-page', { message: 'user added to db' });
    }
  });
export default registerHrRouter;
