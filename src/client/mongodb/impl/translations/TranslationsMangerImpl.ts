import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import TranslationsSchema, { ITranslations } from '../../models/Translation';
import { IBaseRepository } from '../../repository/IBaseRepository';

export class TranslationsMangerImpl
    extends BaseMongooseRepositoryImpl<ITranslations>
    implements IBaseRepository<ITranslations>
{
    constructor() {
        super(TranslationsSchema);
    }
}
