import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateFiltersSchema, IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../repository/IBaseRepository';
import { Connection } from 'mongoose';
import { createModel } from '../../common';

export class FiltersMangerImpl
  extends BaseMongooseRepositoryImpl<IFilters>
  implements IBaseRepository<IFilters>
{
  constructor(connection?: Connection) {
    super(createModel('filters', CreateFiltersSchema, connection));
  }
}
