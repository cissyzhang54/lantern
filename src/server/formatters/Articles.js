import assert from 'assert';
import getField from '../utils/universalDataFormatter';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

    assert.equal(data.length, 3,
      "argument 'data' should be an array of length 3");

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

    assert.equal(typeof data[1], 'object',
      "the second element of 'data' should be an object");

    assert.equal(typeof data[2], 'object',
      "the third element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  let [articleData, metaData, eventData] = data;
  let metaFields = ['title', 'uuid', 'author', 'published', 'published_human', 'genre', 'sections', 'topics']
  let articleFields = [
    'pageViews', 'timeOnPage', 'readTimes', 'readTimesSincePublish', 'channels', 'uniqueVisitors',
    'isSubscription', 'nextInternalUrl', 'internalReferrerTypes', 'internalReferrerUrls', 'isFirstVisit',
    'rfvCluster', 'userCohort', 'isLastPage', 'regions', 'countries', 'devices', 'socialReferrers',
    'referrerUrls', 'referrerNames', 'referrerTypes'
  ]
  let eventFields = [
    'totalCommentsPosted', 'totalCommentsViewed', 'socialSharesTotal', 'socialSharesTypes',
    'totalLinksClicked', 'scrollDepth', 'linkClickCategories'
  ]
  let results = {}
  return new Promise((resolve, reject) => {
    try {
      metaFields.forEach(f => { results[f] = getField(metaData, f)})
      articleFields.forEach(f => { results[f] = getField(articleData, f)})
      eventFields.forEach(f => { results[f] = getField(eventData, f)})
      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
