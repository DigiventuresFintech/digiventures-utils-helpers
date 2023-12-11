import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import { ITranslations } from '../../models/Translation';
import { IBaseRepository } from '../../IBaseRepository';
export declare class TranslationsMangerImpl extends BaseMongooseRepositoryImpl<ITranslations> implements IBaseRepository<ITranslations> {
    constructor();
}
