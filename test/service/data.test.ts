import { app, assert } from 'midway-mock/bootstrap';
import { IDataService } from '../../src/interface';

describe('test/service/data.test.ts', () => {
  it('#loadData', async () => {
    const dataService = await app.applicationContext.getAsync<IDataService>(
      'dataService',
    );
    const data = await dataService.loadData();
    assert(Array.isArray(data) === true);

    const item0 = data[0];
    assert(item0 !== null);
    assert(item0.destination === '801 Toyopa Dr, Pacific Palisades, CA 90272');
    assert(item0.event_name === 'CREATED');
    assert(item0.id === '4b76edbf');
    assert(item0.name === 'Cheese pizza');
    assert(item0.sent_at_second === 4);
  });
});
