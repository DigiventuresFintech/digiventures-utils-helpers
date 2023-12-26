import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import FiltersSchema, { IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../IBaseRepository';

export class FiltersMangerImpl
    extends BaseMongooseRepositoryImpl<IFilters>
    implements IBaseRepository<IFilters>
{
    constructor() {
        super(FiltersSchema);
    }
}
