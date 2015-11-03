import assert from 'assert';
import moment from 'moment';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Object]',
      "argument 'data' should be an object");

    assert.equal(typeof data, 'object',
      "the first element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    try {
      let results = {
        pageViews: data.hits.total,
        socialReaders: 0,
        readTimes: formatAggregation('page_views_over_time', data),
        genre: [], //metaData.genre,
        sections: [],//metaData.sections,
        topics: [],//metaData.topics,
        referrer_types: filterOutTerms(formatFilteredAggregation('referrer_types', data), ['search', 'unknown', 'partner', 'social-network', 'email']),
        referrer_names: formatFilteredAggregation('referrer_names', data),
        social_referrers: filterOutTerms(formatFilteredAggregation('social_referrers', data), ['Facebook', 'Twitter', 'Linked-In']),
        devices : formatAggregation('devices', data),
        countries : formatAggregation('countries', data),
        regions : formatAggregation('regions', data),
        user_cohort : formatAggregation('user_cohort', data),
        rfv_cluster : formatAggregation('rfv_cluster', data),
        is_first_visit : formatAggregation('is_first_visit', data),
        internal_referrer_types: formatFilteredAggregation('internal_referrer_types', data),
        is_subscription : formatAggregation('is_subscription', data),
        unique_visitors : data.aggregations.unique_visitors.value
      };

      resolve(results);

    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });

function formatAggregation(name, data, replacement) {
  return format(data.aggregations[name], replacement)
}

function formatFilteredAggregation(name, data, replacement) {
  return format(data.aggregations[name].filtered, replacement)
}

function format(agg, replacement) {
  return agg.buckets.map((d, i) => {
    let key = replacement || 'eUnknown';
    if (typeof d.key_as_string !== "undefined"){
      key = d.key_as_string
    } else if (typeof d.key !== "undefined"){
      key = d.key
    }
    return [
      key,
      d.doc_count
    ];
  });
}

// In place of min doc count in ES for specific fields
// filter the specific always required fields required here
function filterOutTerms (data, terms) {
  let buckets = [];
  data.forEach(function(value){
    if(terms.indexOf(value[0]) >= 0 || value[1] > 0){
      buckets.push(value)
    }
  });
  return buckets;
}}
