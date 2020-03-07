/* tslint:disable */
const { app, assert } = require('midway-mock/bootstrap');
/* tslint:enable */

describe('test/app/controller/api.test.ts', () => {
  it('should GET /api/connect', () => {
    return app
      .httpRequest()
      .get('/api/connect')
      .expect(200);
  });
});
