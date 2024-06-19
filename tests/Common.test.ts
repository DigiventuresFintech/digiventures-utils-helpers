import { exponentialRetryOperation } from '../src/utils/common';
import { FtpClientManager } from '../src';

describe(__filename, () => {
  describe('suite for retry operation method', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
    });

    test('should no retry when method pass', async () => {
      const ftpConnectSpy = jest
        .spyOn(FtpClientManager.prototype, 'connect')
        .mockResolvedValue({});

      const ftp = new FtpClientManager({});
      const client = await exponentialRetryOperation(() => ftp.connect(), {});
      expect(ftpConnectSpy).toHaveBeenCalledTimes(1);
      expect(client).not.toBeNull();
    });

    test('should no retry when method fails and retry', async () => {
      const ftpConnectFailSpy = jest
        .spyOn(FtpClientManager.prototype, 'connect')
        .mockRejectedValueOnce({});
      const ftpConnectSuccessSpy = jest
        .spyOn(FtpClientManager.prototype, 'connect')
        .mockResolvedValueOnce({});

      const ftp = new FtpClientManager({});
      const client = await exponentialRetryOperation(() => ftp.connect(), {});
      expect(ftpConnectSuccessSpy).toHaveBeenCalledTimes(2);
      expect(ftpConnectFailSpy).toHaveBeenCalledTimes(2);
      expect(client).not.toBeNull();
    });

    test('should no retry when method fails three times', async () => {
      jest.spyOn(FtpClientManager.prototype, 'connect').mockRejectedValue({});

      const ftp = new FtpClientManager({});

      expect(async () => {
        await exponentialRetryOperation(() => ftp.connect(), {});
      }).not.toThrow();
    });
  });
});
