import { ApiBuyerService } from '../src/internal/ApiBuyerService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe(__filename, () => {
  let apiBuyerService: ApiBuyerService;

  beforeAll(() => {
    process.env.API_DOCUMENTS_BASE_URL = 'https://mocked-url.com';
    apiBuyerService = new ApiBuyerService();
  });

  afterAll(() => {
    delete process.env.API_DOCUMENTS_BASE_URL;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBuyer', () => {
    test('should create a buyer successfully', async () => {
      const buyerData = { name: 'Juan Perez' };
      const user = { _id: 'user123', name: 'Juan', email: 'juan@example.com' };
      const workspace = 'test_workspace';
      const responseData = { _id: '123123', ...buyerData };

      mockedAxios.post.mockResolvedValueOnce({ data: responseData });

      const result = await apiBuyerService.createBuyer(
        buyerData,
        user,
        workspace,
      );

      expect(result).toEqual(responseData);
    });

    test('should throw error on createBuyer failure', async () => {
      const buyerData = { name: 'Juan Perez' };
      const user = { _id: 'user123', name: 'Juan', email: 'juan@example.com' };
      const workspace = 'test_workspace';
      const errorResponse = {
        response: {
          data: {
            code: 'ERR_CREATE',
            message: 'Error in creation',
            reason: 'Validation failed',
          },
        },
      };

      mockedAxios.post.mockRejectedValueOnce(errorResponse);

      await expect(
        apiBuyerService.createBuyer(buyerData, user, workspace),
      ).rejects.toEqual({
        code: 'ERR_CREATE',
        message: 'Error in creation',
        reason: 'Validation failed',
        buyer: undefined,
      });
    });
  });

  describe('getBuyers', () => {
    test('should get buyers successfully', async () => {
      const workspace = 'test_workspace';
      const user = { _id: 'user123', role: 'User' };
      const queryParams = { page: 1, limit: 5, filter: '{"role": "buyer"}' };
      const responseData = [{ _id: 'buyer123', name: 'Juan Perez' }];

      mockedAxios.get.mockResolvedValueOnce({ data: responseData });

      const result = await apiBuyerService.getBuyers(
        workspace,
        user,
        queryParams,
      );

      expect(result).toEqual(responseData);
    });

    test('should throw error on getBuyers failure', async () => {
      const workspace = 'test_workspace';
      const user = { _id: 'user123', role: 'User' };
      const queryParams = { page: 1, limit: 5, filter: '{"role": "buyer"}' };
      const errorResponse = {
        response: { data: { message: 'Error fetching buyers' } },
        message: 'Network Error',
      };

      mockedAxios.get.mockRejectedValueOnce(errorResponse);

      await expect(
        apiBuyerService.getBuyers(workspace, user, queryParams),
      ).rejects.toEqual({
        message: 'Error fetching buyers',
        error: 'Network Error',
      });
    });
  });

  describe('updateBuyer', () => {
    test('should update a buyer successfully', async () => {
      const id = 'buyer123';
      const buyerData = { name: 'Juan Updated' };
      const workspace = 'test_workspace';
      const responseData = { _id: 'buyer123', ...buyerData };

      mockedAxios.put.mockResolvedValueOnce({ data: responseData });

      const result = await apiBuyerService.updateBuyer(
        id,
        buyerData,
        workspace,
      );

      expect(result).toEqual(responseData);
    });

    test('should throw error on updateBuyer failure', async () => {
      const id = 'buyer123';
      const buyerData = { name: 'Juan Updated' };
      const workspace = 'test_workspace';
      const errorResponse = {
        response: {
          data: {
            code: 'ERR_UPDATE',
            message: 'Update failed',
            reason: 'Not found',
          },
        },
      };

      mockedAxios.put.mockRejectedValueOnce(errorResponse);

      await expect(
        apiBuyerService.updateBuyer(id, buyerData, workspace),
      ).rejects.toEqual({
        code: 'ERR_UPDATE',
        message: 'Update failed',
        reason: 'Not found',
        buyer: null,
      });
    });
  });

  describe('deleteBuyer', () => {
    test('should delete a buyer successfully', async () => {
      const id = 'buyer123';
      const workspace = 'test_workspace';
      const responseData = { message: 'Buyer deleted successfully' };

      mockedAxios.delete.mockResolvedValueOnce({ data: responseData });

      const result = await apiBuyerService.deleteBuyer(id, workspace);

      expect(result).toEqual(responseData);
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${apiBuyerService.API_DOCUMENTS_BASE_URL}/buyers/${id}`,
        { headers: { workspace } },
      );
    });

    test('should throw error if deleteBuyer fails', async () => {
      const id = 'buyer123';
      const workspace = 'test_workspace';
      const errorResponse = { message: 'Deletion error' };

      mockedAxios.delete.mockRejectedValueOnce(errorResponse);

      await expect(apiBuyerService.deleteBuyer(id, workspace)).rejects.toEqual({
        message: 'Deletion error',
      });
    });
  });
});
