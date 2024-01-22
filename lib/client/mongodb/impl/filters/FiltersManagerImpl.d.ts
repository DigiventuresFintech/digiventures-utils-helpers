import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../repository/IBaseRepository';
export declare class FiltersMangerImpl extends BaseMongooseRepositoryImpl<IFilters> implements IBaseRepository<IFilters> {
    constructor();
}
