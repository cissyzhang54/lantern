import assert from 'assert';
import getField from '../utils/universalDataFormatter';
import articleListFormatter from './ArticleListFormatter';

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

  data.map((d) => {
    if (!d.hasOwnProperty('aggregations')) {
      let error = new Error();
      error.name = 'NoDataError';
      error.message = 'Unable to find data for the selected section';
      throw error;
    }
  });

  return new Promise((resolve, reject) => {

    let [metaData, sectionData, compMetaData, compData] = data;
    try {
      let results = {genre:[],sections:[], topics:[]}
      let metaFields = ['topicsCovered', 'topicCount', 'articlePublishCount']
      let sectionFields = [
        'readTimes', 'pageViews', 'referrerTypes',
        'referrerNames', 'socialReferrers', 'devices', 'countries',
        'regions', 'userCohort', 'rfvCluster', 'isFirstVisit',
        'internalReferrerTypes', 'isSubscription', 'uniqueVisitors',
        'topicViews', 'articleCount'
      ];
      metaFields.forEach(f => { results[f] = getField(metaData, f)})
      sectionFields.forEach(f => { results[f] = getField(sectionData, f)})

      results.articleList = articleListFormatter(sectionData);

      let comparatorResults = {};
      if (compMetaData) {
        let compMetaFields = ['topicsCovered', 'topicCount', 'articlePublishCount']
        let compSectionFields = ['pageViews', 'referrerTypes',
          'referrerNames', 'socialReferrers', 'devices', 'countries', 'regions', 'userCohort',
          'rfvCluster', 'isFirstVisit', 'internalReferrerTypes', 'isSubscription', 'uniqueVisitors',
          'topicViews', 'articleCount'
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
