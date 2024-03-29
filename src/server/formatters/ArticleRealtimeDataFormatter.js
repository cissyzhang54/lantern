import assert from 'assert';
import getField from '../utils/universalDataFormatter.js';

export default function formatData(data) {
  try {
    assert.equal(Array.isArray(data), true,
      "argument 'data' should be an array");

    assert.equal(data.length, 2,
      "argument 'data' should have length 2")

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    throw e;
  }

  let [realtimeData, allData] = data;

  let metaFields = [
    'title',
    'uuid',
    'author',
    'published',
    'published_human',
    'genre',
    'sections',
    'topics'
  ]
  let realtimeFields = [
    'realtimePageViews',
    'realtimePageViewsShifted',
    'realtimeTimeOnPage',
    'realtimeScrollDepth',
    'realtimeLinksClickedByCategory',
    'realtimeTimeOnPageAvg',
    'realtimeScrollDepthAvg',
    'realtimeLinksClicked',
    'realtimeSocialShares',
    'realtimeSocialReferrers',
    'realtimeComments',
    'realtimeCommentsRead',
    'realtimeReferrerNames',
    'realtimeReferrerUrls',
    'realtimeReferrerTypes',
    'realtimeInternalReferrerTotal',
    'realtimeInternalReferrerArticles',
    'realtimeInternalReferrerOther',
    'realtimeInternalReferrerUrls',
    'realtimeUserTypes',
    'lastPublishDate'
  ];
  let realtimeFieldsAllDataFields = [
    'realtimeLatestEvent',
    'realtimeNextInternalUrl',
    'retentionRate',
    'realtimeRetention'
  ]
  let results = {}

  try {
    realtimeFields.forEach(f => {
      let internalExternalReferrers = getField(realtimeData, 'realtimeReferrerTypes');
      internalExternalReferrers.push(['internal', getField(realtimeData, 'realtimeInternalReferrerTotal')]);
      results['realtimeInternalExternalReferrers'] = internalExternalReferrers

      results[f] = getField(realtimeData, f)
    });
    realtimeFieldsAllDataFields.forEach(f => {
      results[f] = getField(allData, f)
    });
    if (realtimeData.hits.hits.length) {
      metaFields.forEach(f => {
        results[f] = getField(realtimeData.hits.hits[0]._source, f)
      });
    }

    return results;
  } catch (e) {
    let error = new Error(e);
    error.message = 'DataParsingError';
    error.response = data;
    error.originalError = e;
    throw error;
  }
}
