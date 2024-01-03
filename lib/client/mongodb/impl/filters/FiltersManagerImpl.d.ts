import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../IBaseRepository';
export declare class FiltersMangerImpl extends BaseMongooseRepositoryImpl<IFilters> implements IBaseRepository<IFilters> {
    constructor();
}
