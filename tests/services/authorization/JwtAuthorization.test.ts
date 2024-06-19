import { JWTAuthorization } from '../../../src';

describe('JWT utility class test', function () {
  const JWTUtil = new JWTAuthorization(
    'bf4c1a0d46b76bd5210f8ffa9f810f1a6c9a2318b23a4acf385d4cfca6f58397',
  );

  it('verify', () => {
    const payload = JWTUtil.verify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSnVhbiIsImlhdCI6MTcxODc2MTEzMSwiZXhwIjoxNzE4NzY4MzMxfQ.Ihqt-aXaQGbk5NkmW9315fHNtdlydn9lVQ2tkYLl5HA',
    );
    expect(payload.name).toEqual('Juan');
  });

  it('sign and verify', () => {
    const token = JWTUtil.sign({
      name: 'Juan',
    });
    expect(token).not.toBeNull();

    const payload = JWTUtil.verify(token);
    expect(payload.name).toEqual('Juan');
  });

  it('sign and verify with empty payload', () => {
    const token = JWTUtil.sign({});
    expect(token).not.toBeNull();
    console.log(token);
    const payload = JWTUtil.verify(token);
    expect(payload.name).toBeUndefined();
  });
});
