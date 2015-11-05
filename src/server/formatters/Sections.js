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
      let [metaData, sectionData] = data;

      let results = {genre:[],sections:[], topics:[]}
      let metaFields = ['articleCount', 'topicsCovered','topic_count']
      let sectionFields = ['readTimes', 'pageViews', 'referrer_types',
        'referrer_names', 'social_referrers', 'devices', 'countries', 'regions', 'user_cohort',
        'rfv_cluster', 'is_first_visit', 'internal_referrer_types', 'is_subscription', 'unique_visitors',
        'topic_views'
      ]
      metaFields.forEach(f => { results[f] = getField(metaData, f)})
      sectionFields.forEach(f => { results[f] = getField(sectionData, f)})
      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
