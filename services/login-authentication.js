import db from '../models/index.cjs';

export default class LoginAuthentication {
  static async employeeCheck(req, res, next) {
    if (req.session.user.role.name === 'employee') {
      next();
    } else if (req.session.user.role.name === 'admin') { res.redirect('/admin'); } else res.redirect('/hr');
  }

  static authCheck(req, res, next) {
    if (req.session && req.session.user) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', 0);
      next();
    } else {
      res.redirect('/login');
    }
  }

  static async hrCheck(req, res, next) {
    if (req.session.user.role.name === 'hr') {
      next();
    } else if (req.session.user.role.name === 'admin') res.redirect('/admin');
    else res.redirect('/employee');
  }

  static async adminCheck(req, res, next) {
    if (req.session.user.role.name === 'admin') {
      next();
    } else {
      res.redirect('/hr');
    }
  }
}
