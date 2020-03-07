import { Context, controller, get, inject, provide } from 'midway';
import { IDataService, IEvent } from '../../interface';

@provide()
@controller('/api/connect')
export class DataController {
  @inject()
  ctx: Context;

  @inject('dataService')
  service: IDataService;

  @get('/')
  async connect(): Promise<void> {
    const events: IEvent[] = await this.service.loadData();
    this.ctx.body = { success: true, message: 'OK', data: events };
  }
}
