import { ApiWebhooksService } from '../src';

describe(__filename, () => {
  const credentials: any = {
    app_id: process.env.APPLICATION_ID || '67b38dd21e4953abaec0d559',
    secret:
      process.env.SECRET_TOKEN ||
      'sk_live_8a8c2213-eeb4-4a44-8e96-6ce1077f3f44',
  };

  it.skip('should update document', async () => {
    process.env.API_WEBHOOKS_BASE_URL = 'https://api.qa.digiventures.la';

    const data = {
      thirdParty: {
        firmaya: {
          groupId: '642486c7502d224a3c06791a',
          documents: {
            '642486c9502d224a2ab1c8b3': {
              signed: false,
            },
            '642486caedf41546a8269271': {
              signed: false,
            },
            '642486cbedf415469c326d19': {
              signed: false,
            },
          },
        },
      },
    };

    await new ApiWebhooksService().updateDocumentById(
      '640a1087996b7b0012f7c6a7',
      data,
      Object.assign({}, credentials),
    );
  });

  it('should update document', async () => {
    process.env.API_WEBHOOKS_BASE_URL = 'https://api.qa.digiventures.la';

    const output = await new ApiWebhooksService().getDocumentByQuery(
      'idNumber=482185266',
      Object.assign({}, credentials),
    );

    console.log(output.results[0] || []);
  });

  it('should get document list', async () => {
    process.env.API_WEBHOOKS_BASE_URL = 'https://api.qa.digiventures.la';

    const output = await new ApiWebhooksService().getDocumentsListByQuery(
      'query={"$and":[{"tenantId":"65fd787c7556d70012b1b6d2"},{"updatedAt":{"$gte":"2025-02-01T00:00:00.000Z"}},{"typeScoring":{"$ne":"Nuevo"}}]}',
      Object.assign({}, credentials),
    );

    console.log(output.results[0] || []);
  });
});
