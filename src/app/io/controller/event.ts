import { Application } from 'midway';
import { IEvent, IEventByTime } from '../../../interface';

module.exports = (app: Application) => {
  class Controller extends app.Controller {
    async index() {
      const message = this.ctx.args[0];
      console.log('[socket: server]', message);
      const dataService = await this.ctx.requestContext.getAsync('dataService');
      const data: IEvent[] = await dataService.loadData();

      const eventObj = this.handleData(data);

      let time = 0;
      if (eventObj[time]) {
        this.handleEvent(eventObj[time]);
      }

      await new Promise(next => {
        const interval = setInterval(() => {
          time++;
          if (Object.keys(eventObj).length === 0) {
            clearInterval(interval);
            next();
          }

          const events = eventObj[time];
          if (events) {
            this.handleEvent(events);
            delete eventObj[time];
          }
        }, 1000);
      });

      // TODO: Events end.
      await this.ctx.socket.emit('res', 'All events are over.');
    }

    handleData(events: IEvent[]): IEventByTime {
      return events.reduce((p: IEventByTime, c: IEvent) => {
        if (!p[c.sent_at_second]) {
          p[c.sent_at_second] = [];
        }

        p[c.sent_at_second].push(c);
        return p;
      }, {});
    }

    handleEvent(events: IEvent[]) {
      console.log(events);
      this.ctx.socket.emit('res', events);
    }
  }

  return Controller;
};
