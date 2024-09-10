import { broadcastInstancesCommand, sendSSMCommand } from '../src';

describe(__filename, () => {
  test.skip('should send command via SSN to a given instanceId successfully', async () => {
    const body = {
      Type: 'Notification',
    };
    const jsonData = JSON.stringify(body);

    const result = await sendSSMCommand(
      ['i-08b6f0ae823424e27', 'i-0ab816df321c622d6'],
      [broadcastInstancesCommand('v1/notify/sns', jsonData)],
    );
    console.log(result);
  });
});
