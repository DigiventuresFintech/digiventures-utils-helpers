import { BaseMongooseRepositoryImpl } from '../../repository/BaseMongooseRepositoryImpl';
import { Connection } from 'mongoose';
import { CreateModel } from '../../common';
import { CreateBuyerSchema, IBuyer } from '../../models/Buyer';
import { IBuyersManager } from './IBuyersManager';

export class BuyersManagerImpl
  extends BaseMongooseRepositoryImpl<IBuyer>
  implements IBuyersManager
{
  constructor(connection?: Connection) {
    super(CreateModel('buyers', CreateBuyerSchema, connection));
  }
}
