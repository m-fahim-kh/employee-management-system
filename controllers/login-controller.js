import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../models/index.cjs';
import LoginAuthentication from '../services/login-authentication.js';

const loginRouter = Router();

loginRouter.route('/login')
  .get(async (req, res, next) => {
    res.render('login-form', { usernameError: '', passwordError: '' });
  })
  .all(bodyParser.urlencoded())
  .post(async (req, res, next) => {
    const resultedUser = await db.users.findOne({
      where: {
        username: req.body.username,
      },
      include: db.roles,
    });
    if (resultedUser === null) { res.render('login-form', { usernameError: 'no such user', passwordError: '' }); } else if (resultedUser.password !== req.body.password) { res.render('login-form', { usernameError: '', passwordError: 'wrong password' }); } else {
      req.session.authenticated = true;
      req.session.user = resultedUser;
      if (req.session.user.role.name === 'admin') { res.redirect('/admin'); } else { res.redirect('/employee'); }
    
    }
  });
loginRouter.route('/')
  .all(async (req, res, next) => {
    res.redirect('/employee');
  });
export default loginRouter;
