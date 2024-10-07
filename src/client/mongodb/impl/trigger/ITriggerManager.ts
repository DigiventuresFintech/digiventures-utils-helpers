import { Trigger } from '../../models/Trigger';
import { IBaseRepository } from '../../repository/IBaseRepository';

export interface ITriggerManager extends IBaseRepository<Trigger> {
  createTrigger(trigger: Trigger): Promise<void>;

  getTrigger(id: string): Promise<Trigger | undefined>;

  getByIds(ids: string[]): Promise<Trigger[]>;
}
