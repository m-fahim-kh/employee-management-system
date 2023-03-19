import bodyParser from 'body-parser';
import { Router } from 'express';
import db from '../models/index.cjs';

const deactivateRouter = Router();

deactivateRouter.route('/')
  .delete(async (req, res, next) => {
    const deleteUser = await db.users.destroy({ where: { id: req.session.user.id } });
    
    req.session.destroy();
    res.end();
  });

export default deactivateRouter;
