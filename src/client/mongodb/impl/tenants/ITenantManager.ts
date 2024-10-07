import { IBaseRepository } from '../../repository/IBaseRepository';
import { ITenant } from '../../models/Tenant';

export interface ITenantManager extends IBaseRepository<ITenant> {}
