import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../models/index.cjs';

const contactRouter = Router();

contactRouter.route('/contact')
  .all(async (req, res, next) => {
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  })
  .get(async (req, res, next) => {
    res.render('employee-contact', { firstName: req.session.user.firstName, lastName: req.session.user.lastName });
  });

export default contactRouter;
