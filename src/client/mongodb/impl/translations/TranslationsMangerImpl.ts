import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import {
  ITranslations,
  CreateTranslationsSchema,
} from '../../models/Translation';
import { IBaseRepository } from '../../repository/IBaseRepository';
import { Connection } from 'mongoose';
import { createModel } from '../../common';

export class TranslationsMangerImpl
  extends BaseMongooseRepositoryImpl<ITranslations>
  implements IBaseRepository<ITranslations>
{
  constructor(connection?: Connection) {
    super(createModel('translations', CreateTranslationsSchema, connection));
  }
}
