import session from 'express-session';

export default class SessionConfig {
  static memoryStore = new session.MemoryStore();

  static applySession(app) {
    app.use(session({
      secret: 'this session',
      cookie: { maxAge: 30000000000 },
      saveUninitialized: false,
      secure: true,
      store: this.memoryStore,
    }));
  }
}
