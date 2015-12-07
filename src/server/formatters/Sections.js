import assert from 'assert';
import getField from '../utils/universalDataFormatter';

export default function SectionDataFormatter(data) {
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
      let [metaData, sectionData, compMetaData, compData] = data;
      let results = {genre:[],sections:[], topics:[]}
      let metaFields = ['topicsCovered', 'topicCount', 'publishTimes']
      let sectionFields = [
        'articleCount', 'readTimes', 'pageViews', 'referrerTypes',
        'referrerNames', 'socialReferrers', 'devices', 'countries',
        'regions', 'userCohort', 'rfvCluster', 'isFirstVisit',
        'internalReferrerTypes', 'isSubscription', 'uniqueVisitors',
        'topicViews'
      ];
      metaFields.forEach(f => { results[f] = getField(metaData, f)})
      sectionFields.forEach(f => { results[f] = getField(sectionData, f)})

      let comparatorResults = {};
      if (compMetaData) {
        let compMetaFields = ['topicsCovered', 'topicCount']
        let compSectionFields = ['comparator', 'articleCount', 'pageViews', 'referrerTypes',
          'referrerNames', 'socialReferrers', 'devices', 'countries', 'regions', 'userCohort',
          'rfvCluster', 'isFirstVisit', 'internalReferrerTypes', 'isSubscription', 'uniqueVisitors',
          'topicViews'
        ]

        compMetaFields.forEach(f => { comparatorResults[f] = getField(compMetaData, f)})
        compSectionFields.forEach(f => { comparatorResults[f] = getField(compData, f)})
      }
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
