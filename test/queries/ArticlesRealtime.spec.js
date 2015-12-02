import {expect} from 'chai';
import ArticlesRealtimeQuery from '../../src/server/queries/ArticleRealTime';
import moment from 'moment';

import sampleQuery from '../fixtures/realtimeQuery.js';

describe('#articlesRealtimeQuery', () => {
  it('should build the query just fine', () => {
    let queryObject = ArticlesRealtimeQuery({
      dateFrom : "2015-11-24T10:15:00.000",
      dateTo : "2015-11-24T11:15:00.000",
      uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
    })
    expect(queryObject).to.deep.equal(sampleQuery);
  })
  it('should throw if passed no query', () => {
    expect(() => ArticlesRealtimeQuery()).to.throw();
  });
  it('should throw if passed no dateFrom', () => {
    const queryObject = {
      dateTo : "2015-11-24T11:15:00.000",
      uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
    };
    expect(() => ArticlesRealtimeQuery(queryObject)).to.throw();
  });
  it('should throw if passed no dateTo', () => {
    const queryObject = {
      dateFrom : "2015-11-24T10:15:00.000",
      uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
    };
    expect(() => ArticlesRealtimeQuery(queryObject)).to.throw();
  });
  it('should throw if passed no uuid', () => {
    const queryObject = {
      dateFrom : "2015-11-24T10:15:00.000",
      dateTo : "2015-11-24T11:15:00.000",
    };
    expect(() => ArticlesRealtimeQuery(queryObject)).to.throw();
  });
  it('should return the correct aggregators', () => {
    const query = {
      uuid: '123',
      dateFrom: '2015-10-01',
      dateTo: '2015-10-10'
    };
    const queryJSON = ArticlesRealtimeQuery(query);
    const props = [
      'page_views',
      'time_on_page_last_hour'
    ];

    for (let i = 0; i < props.length; i++) {
      expect(queryJSON.aggs.hasOwnProperty(props[i])).to.equal(true);
    }
  });
})
