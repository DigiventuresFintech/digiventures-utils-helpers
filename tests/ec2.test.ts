import { listInstanceIdsByTag } from '../src';

describe(__filename, () => {
  test.skip('should return instances ids by tag successfully', async () => {
    const ids = await listInstanceIdsByTag([
      {
        Name: `tag:Environment`,
        Values: ['STAGE'],
      },
      {
        Name: 'tag:Owner',
        Values: ['Onboarding'],
      },
      {
        Name: 'tag:Product',
        Values: ['Flows'],
      },
    ]);

    console.log(ids);
  });
});
