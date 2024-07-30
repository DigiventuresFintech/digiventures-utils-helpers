import { RestUtils } from '../../src';
import { S3Helper } from '../../src/services/s3/S3Helper';
import * as assert from 'assert';

describe(__filename, () => {
    let restUtils: RestUtils;

    beforeAll(() => {
      restUtils = new RestUtils();
    });
  
    beforeEach(() => {
        jest.restoreAllMocks();
      });
    test('should get a file from S3 and return it as a base64 string', async () => {
        const document = 'https://s3.amazonaws.com/test.digiventures/5fd78a652ab79c000150e35b/IdCardFrontService/66a3e6d3b7b555c6bf3332aa-1722017571512';
    
        const spy = jest.spyOn(S3Helper.prototype, 'getObject').mockResolvedValue(Buffer.from('test'));
    
        const result = await restUtils.getBase64FileAsStringFromS3(document);
      
        console.log('Base64 Result:', result);
        assert.ok(result);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('test.digiventures', '5fd78a652ab79c000150e35b/IdCardFrontService/66a3e6d3b7b555c6bf3332aa-1722017571512');
    });

    test('should get a file from faceid S3 bucket and return it as a base64 string', async () => {
       const document = 'https://faceid-image-bucket-dev.s3.amazonaws.com/39910747/9b1190d9-ca6b-4d6b-ac48-4724b7a9d651.png';

      const spy = jest.spyOn(S3Helper.prototype, 'getObject').mockResolvedValue(Buffer.from('test'));
      
      const result = await restUtils.getBase64FileAsStringFromS3(document);
      
      console.log('Base64 Result:', result);
      assert.ok(result);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('faceid-image-bucket-dev', '39910747/9b1190d9-ca6b-4d6b-ac48-4724b7a9d651.png');
    });
});
