import { connect, getConnection } from '../../src';
import { DocumentManagerImpl, IDocument, IDocumentManager } from '../../src';

describe(__filename, () => {
  test.skip('should connect successfully', async () => {
    try {
      await connect({});
    } catch (e) {
      console.error(e);
    }

    const connection = getConnection('');
    const documentManager: IDocumentManager = new DocumentManagerImpl(
      connection,
    );
    const query1Result: IDocument[] = await documentManager.getBy({});
  });
});
