import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { ITranslations } from '../../models/Translation';
import { IBaseRepository } from '../../repository/IBaseRepository';
export declare class TranslationsMangerImpl extends BaseMongooseRepositoryImpl<ITranslations> implements IBaseRepository<ITranslations> {
    constructor();
}
