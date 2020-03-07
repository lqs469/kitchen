/**
 * @description Event abstractions, Data-Service response
 */
export interface IEvent {
  destination: string;
  event_name: string;
  id: string;
  name: string;
  sent_at_second: number;
}

/**
 * @description Data-Service abstractions
 */
export interface IDataService {
  loadData(): Promise<IEvent[]>;
}

export interface IEventByTime {
  [key: number]: IEvent[];
}
