import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateNotifierSchema, INotifier } from '../../models/Notifier';
import { INotifierManager } from './INotifierManager';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';

export class NotifierManagerImpl
  extends BaseMongooseRepositoryImpl<INotifier>
  implements INotifierManager
{
  constructor(connection?: Connection) {
    super(CreateModel('notifiers', CreateNotifierSchema, connection));
  }
}
