import assert from 'assert';
import getField from '../utils/universalDataFormatter';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an object");

    assert.equal(data.length, 2,
      "argument 'data' should be an array of length 2");

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

    assert.equal(typeof data[1], 'object',
      "the second element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }
  let [articleData, eventData] = data;
  let divisor = getField(articleData, 'articleCount')
  let articleFields = [
    'comparator', 'timeOnPage', 'categoryTotalViewCount',
    'articleCount', 'uniqueVisitors' , 'pageViews'
  ]
  let articleAverages = [
    'readTimes', 'readTimesSincePublish', 'referrerTypes', 'socialReferrers', 'regions',
    'isLastPage', 'userCohort', 'rfvCluster', 'isFirstVisit', 'internalReferrerTypes',
    'categoryAverageViewCount', 'categoryAverageUniqueVisitors'
  ]
  let eventFields = ['scrollDepth']
  let eventAverages = [
    'socialSharesTotal', 'socialSharesTypes', 'totalLinksClicked', 'totalCommentsPosted', 'totalCommentsViewed'
  ]
  return new Promise((resolve, reject) => {
    try {
      let results = {}
      articleFields.forEach(f => { results[f] = getField(articleData, f)})
      articleAverages.forEach(f => { results[f] = getField(articleData, f, divisor)})
      eventFields.forEach(f => { results[f] = getField(eventData, f)})
      eventAverages.forEach(f => { results[f] = getField(eventData, f, divisor)})
      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
