import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../../models/index.cjs';

const hrContactRouter = Router();

hrContactRouter.route('/contact')
  .get(async (req, res, next) => {
    res.render('hr-contact', { firstName: req.session.user.firstName, lastName: req.session.user.lastName });
  });

export default hrContactRouter;
