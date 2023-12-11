import { BaseMongooseRepositoryImpl } from '../../BaseMongooseRepositoryImpl';
import TranslationsSchema, { ITranslations } from '../../models/Translation';
import { IBaseRepository } from '../../IBaseRepository';

export class TranslationsMangerImpl
    extends BaseMongooseRepositoryImpl<ITranslations>
    implements IBaseRepository<ITranslations>
{
    constructor() {
        super(TranslationsSchema);
    }
}
