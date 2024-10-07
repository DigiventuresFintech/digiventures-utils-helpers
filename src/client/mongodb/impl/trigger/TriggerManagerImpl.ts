import { CreateTriggerSchema, Trigger } from '../../models/Trigger';
import { ITriggerManager } from './ITriggerManager';
import { CreateModel } from '../../common';
import { Connection } from 'mongoose';
import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';

export class TriggerManagerImpl
  extends BaseMongooseRepositoryImpl<Trigger>
  implements ITriggerManager
{
  constructor(connection?: Connection) {
    super(CreateModel('triggers', CreateTriggerSchema, connection));
  }

  async createTrigger(trigger: Trigger): Promise<void> {
    let results = [];
    try {
      results = await this.insertMany([trigger]);
    } catch (e) {
      throw e;
    }
    return results;
  }

  async getTrigger(id: string): Promise<Trigger | undefined> {
    return await this.getById(id);
  }

  async getByIds(ids: string[]): Promise<Trigger[]> {
    const condition = { _id: { $in: ids }, enable: true };

    return await this.getBy(condition);
  }
}
