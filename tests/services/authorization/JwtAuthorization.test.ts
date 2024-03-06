import { JWTAuthorization } from '../../../src';

describe('JWT utility class test', function () {
  const JWTUtil = new JWTAuthorization(
    'bf4c1a0d46b76bd5210f8ffa9f810f1a6c9a2318b23a4acf385d4cfca6f58397',
  );

  it('verify', () => {
    const payload = JWTUtil.verify(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NjQyMTk4MTYsImV4cCI6MTY5NTc1NTgxNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.myrILBkoOxo3P5tfuNjBdvM3GCMAfSKKo1TyYIk9UTI',
    );
    expect(payload.iss).toEqual('Online JWT Builder');
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
