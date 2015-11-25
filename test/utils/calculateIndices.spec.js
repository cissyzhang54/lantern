import {expect} from 'chai';
import calculateIndices from '../../src/server/utils/calculateIndices';
import {calculateRealtimeIndices} from '../../src/server/utils/calculateIndices.js';

const ES_INDEX = 'indexName-';

let oldEnv = process.env.ES_INDEX_ROOT;

describe('#calculateRealtimeIndices', () => {
  it('should return one index if both dates are in the same hour', () => {
    const query = {
     dateFrom : ('2015-01-01T20:00:00'),
     dateTo : ('2015-01-01T21:00:00')
    }

    expect(calculateRealtimeIndices(query, 'realtime-')).to.deep.equal([
      'realtime-2015-01-01-20',
      'realtime-2015-01-01-21',
    ]);
  })

  it('should return two indices if dates are in different hours', () => {
    const query = {
     dateFrom : ('2015-01-01T20:15:00'),
     dateTo : ('2015-01-01T21:15:00')
    }

    expect(calculateRealtimeIndices(query, 'realtime-')).to.deep.equal([
      'realtime-2015-01-01-20',
      'realtime-2015-01-01-21'
    ]);
  })

  it('should calculate dates between days correctly', () => {
    const query = {
     dateFrom : ('2015-01-01T23:15:00'),
     dateTo : ('2015-01-02T00:15:00')
    }

    expect(calculateRealtimeIndices(query, 'realtime-')).to.deep.equal([
      'realtime-2015-01-01-23',
      'realtime-2015-01-02-00'
    ]);
  })
});

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
