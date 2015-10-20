import {expect} from 'chai';
import calculateIndices from '../../src/server/utils/calculateIndices';

const ES_INDEX = 'indexName-';

let oldEnv = process.env.ES_INDEX_ROOT;

describe('#calculateIndices', () => {

  beforeEach(()=> {
    process.env.ES_INDEX_ROOT = ES_INDEX;
  });

  afterEach(() => {
    process.env.ES_INDEX_ROOT = oldEnv;
  });

  it('should calculate the indices correctly for dates within the same ten days', () => {
    const query = {
      dateFrom: '2015-10-01',
      dateTo: '2015-10-09'
    };
    const expected = ES_INDEX + '2015-10-0*';

    expect(calculateIndices(query, ES_INDEX)).to.equal(expected);

  });

  it('should calculate the indices correclty for dates within the same month', () => {
    const queries = [
      {
        dateFrom: '2015-10-01',
        dateTo: '2015-10-10'
      },
      {
        dateFrom: '2015-10-10',
        dateTo: '2015-10-21'
      }
    ];
    const expected = ES_INDEX + '2015-10-*';

    for (let i = 0; i < queries.length; i++) {
      expect(calculateIndices(queries[i], ES_INDEX)).to.equal(expected);
    }
  })

});
