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

  return new Promise((resolve, reject) => {
    let [metaData, sectionData, compMetaData, compData] = data;
    try {
      let results = {genre:[],sections:[], topics:[]}
      let metaFields = ['topicsCovered', 'topicCount', 'publishTimes', 'articlePublishCount']
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
      if (!metaData.hasOwnProperty('aggregations')) {
        error.name = 'NoDataError';
        error.message = 'Unable to find metadata for the current query';
      }
      else if (!sectionData.hasOwnProperty('aggregations')) {
        error.name = 'NoDataError';
        error.message = 'Unable to find data for the current query';
      }
      else if (!compMetaData || !compMetaData.hasOwnProperty('aggregations')) {
        error.name = 'NoDataError';
        error.message = 'Unable to find metadata for the current comparator query';
      }
      else if (!compData || !compData.hasOwnProperty('aggregations')) {
        error.name = 'NoDataError';
        error.message = 'Unable to find data for the current comparator query';
      }
      else {
        error.name = 'DataParsingError';
      }
      error.response = data;
      reject(error);
    }
  });
}
