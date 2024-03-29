import { expect } from 'chai';
import ArticlesQuery from '../../src/server/esQueries/Articles';

describe('Articles Query', () => {
  it('should be a function', () => {
    expect(ArticlesQuery).to.be.a('function')
  });
  it('should not throw if passed a correct query object', () => {
    const query = {
      uuid: '123',
      dateTo: new Date().toISOString(),
      dateFrom: new Date().toISOString(),
      filters: {}
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
      dateTo: new Date().toISOString(),
      filters: {}
    };
    expect(() => ArticlesQuery(query)).to.throw();
  });
  it('should throw if passed no dateTo', () => {
    const query = {
      uuid: '123',
      dateFrom: new Date().toISOString(),
      filters: {}
    };
    expect(() => ArticlesQuery(query)).to.throw();
  });
  it('should return an interval of an hour for spans of a day', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-01-02',
      filters: {}
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('hour');
  });
  it('should return an interval of a hour fror spans of a week or less', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-01-07',
      filters: {}
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('hour');
  });
  it('should return an interval of a day for spans of a month or less', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-02-01',
      filters: {}
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('day');
  });
  it('should return an interval of a day for spans of six months or less', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-06-01',
      filters: {}
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('day');
  });
  it('should return an interval of week for spans of more than six months', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-01-01',
      dateTo: '2015-11-01',
      filters: {}
    };
    expect(ArticlesQuery(query).aggs.page_views_over_time.date_histogram.interval)
      .to.equal('week');
  });
  it('should return the correct aggregators', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-10-01',
      dateTo: '2015-10-10',
      filters: {},
      type: 'view'
    };
    const queryJSON = ArticlesQuery(query);
    const props = [
      'page_views_since_publish',
      'page_views_over_time',
      'avg_time_on_page',
      'channels',
      'referrerNames',
      'referrerTypes',
      'socialReferrers',
      'referrerUrls',
      'devices',
      'regions',
      'countries',
      'isLastPage',
      'userCohort',
      'rfvCluster',
      'isFirstVisit',
      'internalReferrerUrls',
      'internalReferrerTypes',
      'nextInternalUrl',
      'isSubscription',
      'uniqueVisitors'
    ];
    for (let i = 0; i < props.length; i++) {
      expect(queryJSON.aggs.hasOwnProperty(props[i])).to.be.truthy;
    }
  });
});
