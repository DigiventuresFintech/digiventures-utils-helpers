import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { IFilters } from '../../models/Filters';
import { IBaseRepository } from '../../repository/IBaseRepository';
import { Connection } from 'mongoose';
export declare class FiltersMangerImpl extends BaseMongooseRepositoryImpl<IFilters> implements IBaseRepository<IFilters> {
    constructor(connection?: Connection);
}
