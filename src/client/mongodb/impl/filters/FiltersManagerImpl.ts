import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { CreateFiltersSchema, IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../repository/IBaseRepository';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';

export class FiltersMangerImpl
  extends BaseMongooseRepositoryImpl<IFilters>
  implements IBaseRepository<IFilters>
{
  constructor(connection?: Connection) {
    super(CreateModel('filters', CreateFiltersSchema, connection));
  }
}
