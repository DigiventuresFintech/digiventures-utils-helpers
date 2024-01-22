import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import FiltersSchema, { IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../repository/IBaseRepository';

export class FiltersMangerImpl
    extends BaseMongooseRepositoryImpl<IFilters>
    implements IBaseRepository<IFilters>
{
    constructor() {
        super(FiltersSchema);
    }
}
