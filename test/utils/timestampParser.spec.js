import moment from 'moment';
import timestampParser from '../../src/server/utils/timestampParser';
import {expect} from 'chai';

describe('timestampParser', () => {
  it('should handle one hour', () => {
    let baseDate = '2015-12-25T16:00:00.000Z';
    let result = timestampParser('1h', baseDate);

    expect(result.dateFrom).to.equal('2015-12-25T15:00:00.000Z')
  });
  it('should handle 48 hours', () => {
    let baseDate = '2015-12-25T16:00:00.000Z';
    let result = timestampParser('48h', baseDate);

    expect(result.dateFrom).to.equal('2015-12-23T16:00:00.000Z')
  });
})
