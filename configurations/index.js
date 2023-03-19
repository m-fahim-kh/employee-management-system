import path from 'path';
import express from 'express';
import SessionConfig from './session-config.js';

export default function configure(server) {
  server.set('views', path.join(path.resolve(), 'views'));
  server.set('view engine', 'ejs');
  server.use(express.static(path.join(path.resolve(), 'public', 'static')));
  SessionConfig.applySession(server);
}
