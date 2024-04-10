import { JSONUtils } from '../lib';

describe('Suit for json difference method', function () {
  test('happy path', () => {
    const result: any = {};
    JSONUtils.jsonDifference({ val1: 'Juan' }, { val1: 'Pedro' }, '', result);

    expect(result).not.toBeUndefined();
    expect(result.val1).toEqual('Pedro');
  });

  test('test when json has nested attributes', () => {
    const result: any = {};
    JSONUtils.jsonDifference(
      { obj1: { obj2: { name: 'Juan' } } },
      { obj1: { obj2: { name: 'Luca' } } },
      '',
      result,
    );

    expect(result).not.toBeUndefined();
    expect(result.obj1).not.toBeUndefined();
    expect(result.obj1.obj2).not.toBeUndefined();
    expect(result.obj1.obj2.name).toEqual('Luca');
  });

  test('test when json has multiples nested attributes', () => {
    const result: any = {};
    JSONUtils.jsonDifference(
      {
        obj1: {
          obj2: {
            name: 'Juan',
          },
        },
        obj4: {
          obj5: {
            tIndex: 3,
          },
        },
        obj2: {
          obj3: {
            index: 3,
          },
        },
      },
      {
        obj1: {
          obj2: {
            name: 'Luca',
          },
        },
        obj2: {
          obj3: {
            index: 4,
          },
        },
      },
      '',
      result,
    );

    expect(result).not.toBeUndefined();
    expect(result.obj2).not.toBeUndefined();
    expect(result.obj2.obj3.index).toEqual(4);
  });

  test('test when json has nested attributes and array', () => {
    const result: any = {};
    JSONUtils.jsonDifference(
      {
        managment: {
          participants: [
            {
              key: 'A',
            },
          ],
        },
      },
      {
        managment: {
          participants: [
            {
              key: 'B',
            },
          ],
        },
      },
      '',
      result,
    );

    expect(result).not.toBeUndefined();
    expect(result.managment).not.toBeUndefined();
    expect(result.managment.participants).not.toBeUndefined();
    expect(result.managment.participants[0].key).toEqual('B');
  });

  test('test when json has missing attributes option happy path', () => {
    const result: any = {};
    JSONUtils.jsonDifference(
      { val1: 'Juan', val7: 'JotaEme' },
      { val1: 'Pedro' },
      '',
      result,
      {
        onlyAttributes: 1,
      },
    );
    expect(result).not.toBeUndefined();
    expect(result.val7).toEqual('JotaEme');
  });

  test('test when json has missing attributes option with more than one attributes', () => {
    const result: any = {};
    JSONUtils.jsonDifference(
      {
        val1: 'Juan',
        val6: 'JotaEme',
        val10: 'JotaEme',
        val7: 'JotaEme',
      },
      {
        val1: 'Pedro',
      },
      '',
      result,
      {
        onlyAttributes: 1,
      },
    );
    expect(result).not.toBeUndefined();
    expect(result.val1).toBeUndefined();
    expect(result.val6).toEqual('JotaEme');
    expect(result.val10).toEqual('JotaEme');
    expect(result.val7).toEqual('JotaEme');
  });

  test('test when json has missing attributes option with more than one attributes and nested objects', () => {
    const result: any = {};
    JSONUtils.jsonDifference(
      {
        val1: 'Juan',
        val6: {
          val1: {
            val10: 'JotaEme',
          },
        },
        val10: {
          val10: 'JotaEme',
        },
        val7: 'JotaEme',
      },
      {
        val1: 'Pedro',
      },
      '',
      result,
      {
        onlyAttributes: 1,
      },
    );
    expect(result).not.toBeUndefined();
    expect(result.val6.val1.val10).toEqual('JotaEme');
    expect(result.val10.val10).toEqual('JotaEme');
    expect(result.val7).toEqual('JotaEme');
  });
});
