import express from 'express';
import configure from './configurations/index.js';
import centralRouter from './controllers/index.js';

const mainServer = express();
const port = 8081;
mainServer.listen(port);
configure(mainServer);
mainServer.use(centralRouter);
export default mainServer;
