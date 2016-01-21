import assert from 'assert';
import getField from '../utils/universalDataFormatter';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

    assert.equal(data.length, 5,
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

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  let [metaData, articleData, eventData, articleComparatorData, eventComparatorData] = data;
  let metaFields = ['title', 'uuid', 'author', 'published', 'published_human', 'genre', 'sections', 'topics']
  let articleFields = [
    'pageViews', 'timeOnPage', 'readTimes', 'channels', 'uniqueVisitors',
    'isSubscription', 'nextInternalUrl', 'internalReferrerTypes', 'internalReferrerUrls', 'isFirstVisit',
    'rfvCluster', 'userCohort', 'isLastPage', 'regions', 'countries', 'devices', 'socialReferrers',
    'referrerUrls', 'referrerNames', 'referrerTypes', 'top5TimeOnPage'
  ]
  let eventFields = [
    'totalCommentsPosted', 'totalCommentsViewed', 'socialSharesTotal', 'socialSharesTypes',
    'totalLinksClicked', 'scrollDepth', 'linkClickCategories'
  ]
  let divisor = getField(articleComparatorData, 'articleCount')
  let articleComparatorFields = [
    'comparator', 'timeOnPage', 'categoryTotalViewCount',
    'articleCount', 'uniqueVisitors' , 'pageViews'
  ]
  let articleComparatorAverages = [
    'referrerTypes', 'socialReferrers', 'regions',
    'isLastPage', 'userCohort', 'rfvCluster', 'isFirstVisit', 'internalReferrerTypes',
    'categoryAverageViewCount', 'categoryAverageUniqueVisitors'
  ]
  let eventComparatorFields = ['scrollDepth']
  let eventComparatorAverages = [
    'socialSharesTotal', 'socialSharesTypes', 'totalLinksClicked', 'totalCommentsPosted', 'totalCommentsViewed'
  ]
  let results = {}
  let comparatorResults = {};
  return new Promise((resolve, reject) => {
    try {
      metaFields.forEach(f => { results[f] = getField(metaData, f)})
      articleFields.forEach(f => { results[f] = getField(articleData, f)})
      eventFields.forEach(f => { results[f] = getField(eventData, f)})
      articleComparatorFields.forEach(f => { comparatorResults[f] = getField(articleComparatorData, f)})
      articleComparatorAverages.forEach(f => { comparatorResults[f] = getField(articleComparatorData, f, divisor)})
      eventComparatorFields.forEach(f => { comparatorResults[f] = getField(eventComparatorData, f)})
      eventComparatorAverages.forEach(f => { comparatorResults[f] = getField(eventComparatorData, f, divisor)})
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
