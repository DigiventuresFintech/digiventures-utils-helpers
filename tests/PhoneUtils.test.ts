import { PhoneUtils } from '../src/utils/PhoneUtils';

describe('Unit test for phone utility', function () {
  it('verify get area code when it has two digits', async () => {
    const phoneNumber = '+541136836158';
    const number = new PhoneUtils().GetAreaCode(phoneNumber);
    expect(number).toEqual('11');
  });

  it('verify get area code when it has three digits', async () => {
    const phoneNumber = '+542206836158';
    const number = new PhoneUtils().GetAreaCode(phoneNumber);
    expect(number).toEqual('220');
  });

  it('verify get area code when it has four digits', async () => {
    const phoneNumber = '+542227479674';
    const number = new PhoneUtils().GetAreaCode(phoneNumber);
    expect(number).toEqual('2227');
  });

  it('verify get area code when it has three digits with complete phone number', async () => {
    const phoneNumber = '+5422366879099';
    const number = new PhoneUtils().GetAreaCode(phoneNumber);
    expect(number).toEqual('223');
  });
});
