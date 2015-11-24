import {expect} from 'chai';
import articlesRealtimeQuery from '../../src/server/queries/ArticleRealTime';
import moment from 'moment';

import sampleQuery from '../fixtures/realtimeQuery.js';

describe('#articlesRealtimeQuery', () => {
  it('should build the query just fine', () => {
    let queryObject = articlesRealtimeQuery({
      dateFrom : "2015-11-24T10:15:00.000",
      dateTo : "2015-11-24T11:15:00.000",
      uuid: "f02cca28-9028-11e5-bd82-c1fb87bef7af"
    })

    expect(queryObject).to.deep.equal(sampleQuery);
  })
})
