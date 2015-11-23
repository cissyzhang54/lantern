import assert from 'assert';
import getField from '../utils/universalDataFormatter';

export default function TopicDataFormatter(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

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

  return new Promise((resolve, reject) => {
    try {
      let [metaData, topicData] = data;
      let results = {genre:[], sections:[], topics:[]};
      let metaFields = ['articleCount', 'sectionsCovered', 'sectionCount'];
      let topicFields = ['comparator', 'pageViews', 'referrerTypes',
        'referrerNames', 'socialReferrers', 'devices', 'countries', 'regions', 'userCohort',
        'rfvCluster', 'isFirstVisit', 'internalReferrerTypes', 'isSubscription', 'uniqueVisitors',
        'sectionViews'];

      metaFields.forEach(f => { results[f] = getField(metaData, f)})
      topicFields.forEach(f => { results[f] = getField(topicData, f)})

      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
