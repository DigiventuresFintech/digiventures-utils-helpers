import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateTenantSchema, ITenant } from '../../models/Tenant';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';
import { ITenantManager } from './ITenantManager';

export class TenantManagerImpl
  extends BaseMongooseRepositoryImpl<ITenant>
  implements ITenantManager
{
  constructor(connection?: Connection) {
    super(CreateModel('tenants', CreateTenantSchema, connection));
  }
}
