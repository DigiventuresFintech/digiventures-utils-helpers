import { IBaseClientConnection } from '../../src/client/IBaseClientConnection';
import { MongoDBConnection } from '../../src/client/mongodb/MongoDBConnection';
import { DocumentManagerImpl } from '../../src/client/mongodb/impl/DocumentManagerImpl';
import { IDocumentManager } from '../../src/client/mongodb/impl/IDocumentManager';
import { IDocument } from "../../src/client/mongodb/models/Document";
import { S3Helper } from "../../src";

describe(__filename, () => {
    test('should success get document by id', async () => {

        await new S3Helper().s3_file_exist('digiventures-onboarding', 'builds/digiventures-global-mirror/external-process-aws-lambda/1.0.32/external-process-aws-lambda.zip')



/*
        const connection: IBaseClientConnection = new MongoDBConnection();
        await connection.connect();

        const documentManager: IDocumentManager = new DocumentManagerImpl();

        let daysBefore: Date = new Date();
        daysBefore.setDate(daysBefore.getDate() - 5);

        let updateAttributes: Record<string, any> = {
            $set: {
                'status': 'Segunda gestión',
                'managment': {
                    'participants': []
                }
            },
        }

        // Query 1 (OK)
        let conditions: Record<string, any> = {
            tenantId: { $eq: '5fd78a652ab79c000150e35b' },
            status: { $eq: 'Nuevo' },
            createdAt: {
                $gte: daysBefore.toISOString(),
                $lte: new Date().toISOString(),
            },
            firstUserModifier: { $exists: false },
        };
        const query1Result: IDocument[] = await documentManager.getBy(conditions);

        await documentManager.updateMany(conditions, updateAttributes);

        //  Query 3 (OK)
        daysBefore = new Date();
        daysBefore.setDate(daysBefore.getDate() - 10);
        let conditions3: Record<string, any> = {
            tenantId: { $eq: '5fd78a652ab79c000150e35b' },
            status: { $eq: 'Nuevo' },
            createdAt: {
                $gte: daysBefore.toISOString(),
                $lte: new Date().toISOString(),
            },
        };
        await documentManager.updateMany(conditions3, updateAttributes);

        //  Query 4 (OK)
        let conditions4: Record<string, any> = {
            tenantId: { $eq: '5fd78a652ab79c000150e35b' },
            status: { $eq: 'En gestión' },
            $or: [
                { rejectionMessage: { $eq: 'Titular desistió' } },
                { rejectionMessage: { $eq: 'No cumple requisitos' } },
            ],
        };
        await documentManager.updateMany(conditions4, updateAttributes);
 */
    }, 500000);
});
