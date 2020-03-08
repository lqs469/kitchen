import { IEvent } from '../src/interface';

const { mm } = require('midway-mock');
const path = require('path');
// const assert = require('assert');
const ioc = require('socket.io-client');

/* tslint:disable */
const { assert } = require('midway-mock/bootstrap');
/* tslint:enable */

const basePort = 17001;

function client(nsp = '', opts = { port: 7001 }) {
  const url = 'http://localhost:' + opts.port + nsp;
  return ioc(url, opts);
}

describe('test/socketio.test.ts', () => {
  it('should event feeds/modify works ok', done => {
    const app = mm.cluster({
      baseDir: path.join(__dirname, '../'),
      workers: 1,
      typescript: true,
      sticky: false,
    });

    let idx = 1;

    app.ready().then(() => {
      const socket = client('/ws', { port: basePort });

      socket.on('connect', () => {
        socket.emit('event', 'ready');
      });

      socket.on('disconnect', () => {
        console.log('discont');
        app.close().then(done, done);
      });

      socket.on('res', (msg: string | IEvent[]) => {
        if (idx === 1) {
          assert(msg === 'connected!');
        }

        if (idx === 2 && typeof msg[0] === 'object') {
          assert(msg[0].id === 'f7711c3b');
          socket.emit('modify', 'modify-event-data');
        }

        if (idx === 3) {
          assert(msg[0] === 'modify-event-data');
          socket.close();
        }

        idx++;
      });
    });
  });
});
