import assert from 'assert';
import getField from '../utils/universalDataFormatter';
import assign from 'object-assign';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

    assert.equal(data.length, 6,
      "argument 'data' should be an array of length 5");

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

    assert.equal(typeof data[1], 'object',
      "the second element of 'data' should be an object");

    assert.equal(typeof data[2], 'object',
      "the third element of 'data' should be an object");

    assert.equal(typeof data[3], 'object',
      "the fourth element of 'data' should be an object");

    assert.equal(typeof data[4], 'object',
      "the fifth element of 'data' should be an object");

    assert.equal(typeof data[5], 'object',
      "the fifth element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  // Check all but the first data response for aggregations
  // - the first item is the article metadata
  let errors = data.slice(1).map((d) => {
    if (!d.hasOwnProperty('aggregations')) {
      let error = new Error();
      error.name = 'NoDataError';
      error.message = 'Unable to find data for the selected article';
      // we throw here because we are inside a callback
      throw error;
    }
  });

  let [metaData, articleData, eventData, articleComparatorData, eventComparatorData, articlePublishTimesData] = data;

  let metaFields = ['title', 'uuid', 'author', 'published', 'published_human', 'genre', 'sections', 'topics', 'primarySection']
  let articleFields = [
    'pageViews', 'timeOnPage', 'readTimes', 'channels', 'uniqueVisitors',
    'isSubscription', 'nextInternalUrl', 'internalReferrerTotal', 'internalReferrerTypes', 'internalReferrerUrls', 'isFirstVisit',
    'rfvCluster', 'userCohort', 'isLastPage', 'regions', 'countries', 'devices', 'socialReferrers',
    'referrerTotal', 'referrerUrls', 'referrerNames', 'referrerTypes', 'top5TimeOnPage', 'headlineStatsOverTime'
  ]
  let eventFields = [
    'totalCommentsPosted', 'totalCommentsViewed', 'socialSharesTotal', 'socialSharesTypes',
    'totalLinksClicked', 'scrollDepth', 'linkClickCategories', 'scrollOverTime'
  ]
  let divisor = getField(articleComparatorData, 'articleCount')
  let articleComparatorFields = [
    'timeOnPage', 'categoryTotalViewCount',
    'articleCount', 'pageViews'
  ]
  let articleComparatorAverages = [
    'referrerTypes', 'socialReferrers', 'regions', 'internalReferrerTotal',
    'isLastPage', 'userCohort', 'rfvCluster', 'isFirstVisit', 'internalReferrerTypes',
    'categoryAverageViewCount', 'categoryAverageUniqueVisitors'
  ]
  let articlePublishTimeFields = ['lastPublishDate']

  let results = {}
  let comparatorResults = {};

  return new Promise((resolve, reject) => {
    try {
      // Data
      let internalExternalReferrers = getField(articleData, 'referrerTypes');
      internalExternalReferrers.push(['internal', getField(articleData, 'internalReferrerTotal')]);
      results['internalExternalReferrers'] = internalExternalReferrers;

      metaFields.forEach(f => { results[f] = getField(metaData, f)});
      articleFields.forEach(f => { results[f] = getField(articleData, f)});
      articlePublishTimeFields.forEach(f => { results[f] = getField(articlePublishTimesData, f)});
      eventFields.forEach(f => { results[f] = getField(eventData, f)});

      // Comparator Data
      let internalExternalReferrersComp = getField(articleComparatorData, 'referrerTypes');
      internalExternalReferrersComp.push(['internal', getField(articleComparatorData, 'internalReferrerTotal')]);
      comparatorResults['internalExternalReferrers'] = internalExternalReferrersComp;

      articleComparatorFields.forEach(f => { comparatorResults[f] = getField(articleComparatorData, f)});
      articleComparatorAverages.forEach(f => { comparatorResults[f] = getField(articleComparatorData, f, divisor)});
      resolve({
        data: results,
        comparatorData: comparatorResults
      });
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
