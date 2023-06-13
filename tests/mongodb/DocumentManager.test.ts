import { IBaseClientConnection } from '../../src/client/IBaseClientConnection';
import { MongoDBConnection } from '../../src/client/mongodb/MongoDBConnection';
import { DocumentManagerImpl } from '../../src/client/mongodb/impl/DocumentManagerImpl';
import { IDocumentManager } from '../../src/client/mongodb/impl/IDocumentManager';
import { IDocument } from "../../src/client/mongodb/models/Document";

describe(__filename, () => {
    test.skip('should success get document by id', async () => {
        const connection: IBaseClientConnection = new MongoDBConnection();
        await connection.connect();

        const documentManager: IDocumentManager = new DocumentManagerImpl();

        // Query 1 (OK)
        const query1Result: IDocument[] = await documentManager.getBy({
            $and: [
                {
                    createdAt: {
                        $gte: '2023-06-08T00:00:00.000Z',
                        $lt: '2023-06-08T23:59:59.999Z',
                    },
                },
                {
                    tenantId: '5fd78a652ab79c000150e35b',
                },
                {
                    "status": 'Nuevo'
                },
            ],
        });

        let arrToUpdate: any[] = query1Result.map(e => e.createdAt);
        console.log(
          'Query records',
          query1Result.length,
          JSON.stringify(arrToUpdate),
        );
    }, 500000);
});
