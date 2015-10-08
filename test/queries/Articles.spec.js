import { expect } from 'chai';
import ArticlesQuery from '../../src/server/queries/Articles';

describe('Articles Query', () => {
  it('should be a function', () => {
    expect(ArticlesQuery).to.be.a.function;
  });
  it('should not throw if passed a correct query object', () => {
    const query = {
      uuid: '123',
      dateTo: new Date().toISOString(),
      dateFrom: new Date().toISOString()
    };
    expect(() => ArticlesQuery(query)).not.to.throw();
  });
  it('should throw if passed no query object', () => {
    expect(() => ArticlesQuery()).to.throw();
  });
  it('should throw if passed no query uuid', () => {
    expect(() => ArticlesQuery({})).to.throw();
  });
  it('should throw if passed no dateFrom', () => {
    const query = {
      uuid: '123',
      dateTo: new Date().toISOString()
    };
    expect(() => ArticlesQuery(query)).to.throw();
  });
  it('should throw if passed no dateTo', () => {
    const query = {
      uuid: '123',
      dateFrom: new Date().toISOString()
    };
    expect(() => ArticlesQuery(query)).to.throw();
  });
  it('should return an interval of an hour for spans of a day', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-01-02'
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('hour');
  });
  it('should return an interval of a day fror spans of a week or less', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-01-07'
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('day');
  });
  it('should return an interval of a day for spans of a month or less', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-02-01'
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('day');
  });
  it('should return an interval of a day for spans of six months or less', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-06-01'
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('day');
  });
  it('should return an interval of week for spans of more than six months', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-11-01'
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('week');
  });
  it('should return the correct aggregators', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-10-01',
      dateTo: '2015-10-10'
    };
    const queryJSON = ArticlesQuery(query);
    const props = [
      'page_views_over_time',
      'avg_time_on_page',
      'channels',
      'referrer_names',
      'referrer_types',
      'referrer_urls',
      'devices',
      'regions',
      'countries',
      'is_last_page',
      'user_cohort',
      'rfv_cluster',
      'is_first_visit'
    ];
    for (let i = 0; i < props.length; i++) {
      expect(queryJSON.aggs.hasOwnProperty(props[i])).to.be.truthy;
    }
  });
});
