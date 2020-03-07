import { provide, inject, Context } from 'midway';
import { IDataService, IEvent } from '../interface';
const fs = require('fs');
const path = require('path');

@provide('dataService')
export class DataService implements IDataService {
  @inject()
  ctx: Context;

  async loadData(): Promise<IEvent[]> {
    return new Promise(next => {
      fs.readFile(
        path.resolve('./src/data/data.json'),
        'utf-8',
        (err: Error, res: string) => {
          if (err) {
            this.ctx.logger.error(err);
            next([]);
            return;
          }

          try {
            const data = JSON.parse(res);
            next(data);
          } catch (error) {
            next([]);
          }
        },
      );
    });
  }
}
