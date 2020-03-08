import { Application } from 'midway';

module.exports = (app: Application) => {
  // or app.io.of('/')
  app.io.of('ws').route('event', app.io.controller.event.index);
  app.io.of('ws').route('modify', app.io.controller.event.modify);
};
