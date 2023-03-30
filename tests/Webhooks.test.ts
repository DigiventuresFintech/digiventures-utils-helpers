import { ApiWebhooksService } from "../src";

describe(__filename, () => {
  const credentials: any = {
    app_id: process.env.APPLICATION_ID || '6408c4f48583c50012d0303c',
    secret:
      process.env.SECRET_TOKEN ||
      'sk_live_82a93afe-982e-4d63-8a93-22d0c2cfa7f1',
  };

  it.skip('should update document', async () => {
    process.env.API_WEBHOOKS_BASE_URL = 'https://api.qa.digiventures.la'

    const data = {
      "thirdParty": {
        "firmaya": {
          "groupId": "642486c7502d224a3c06791a",
          "documents": {
              "642486c9502d224a2ab1c8b3": {
                "signed": false
              },
              "642486caedf41546a8269271": {
                "signed": false
              },
              "642486cbedf415469c326d19": {
                "signed": false
              }
          }
        }
      }
    }

    await new ApiWebhooksService().updateDocumentById(
      '640a1087996b7b0012f7c6a7',
      data,
      Object.assign({}, credentials)
    );
  })

  it('should update document', async () => {
    process.env.API_WEBHOOKS_BASE_URL = 'https://api.qa.digiventures.la'

    const results = await new ApiWebhooksService().getDocumentByQuery(
      'idNumber=48218526',
      Object.assign({}, credentials)
    );

    console.log(results[0] || [])
  })
})
