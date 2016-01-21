import {expect} from 'chai';
import * as calculateInterval from '../../src/server/utils/calculateInterval';

describe('#calculateInterval', () => {
  describe('interval', () => {
    it('should calculate the interval correctly for two dates', () => {
      expect(calculateInterval.interval('2015-10-01', '2015-10-01')).to.equal('hour');
      expect(calculateInterval.interval('2015-10-01', '2015-10-07')).to.equal('hour');
      expect(calculateInterval.interval('2015-10-01', '2015-10-09')).to.equal('day');
      expect(calculateInterval.interval('2015-10-01', '2015-12-01')).to.equal('day');
    });
  });

  describe('minuteInterval', () => {
    it('should calculate the minute interval correctly for two dates', () => {
      expect(calculateInterval.minuteInterval('2015-10-01', '2015-10-01')).to.equal(60);
      expect(calculateInterval.minuteInterval('2015-10-01', '2015-10-07')).to.equal(60);
      expect(calculateInterval.minuteInterval('2015-10-01', '2015-10-09')).to.equal(1440);
    });
  });
});
