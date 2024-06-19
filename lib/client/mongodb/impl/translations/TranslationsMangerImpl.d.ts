import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { ITranslations } from '../../models/Translation';
import { IBaseRepository } from '../../repository/IBaseRepository';
import { Connection } from 'mongoose';
export declare class TranslationsMangerImpl extends BaseMongooseRepositoryImpl<ITranslations> implements IBaseRepository<ITranslations> {
    constructor(connection?: Connection);
}
