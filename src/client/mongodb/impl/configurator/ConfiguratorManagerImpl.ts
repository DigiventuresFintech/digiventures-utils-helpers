import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';
import {
  CreateConfiguratorSchema,
  IConfigurator,
} from '../../models/Configurator';
import { IConfiguratorManager } from './IConfiguratorManager';

export class ConfiguratorManagerImpl
  extends BaseMongooseRepositoryImpl<IConfigurator>
  implements IConfiguratorManager
{
  constructor(connection?: Connection) {
    super(CreateModel('configurators', CreateConfiguratorSchema, connection));
  }
}
