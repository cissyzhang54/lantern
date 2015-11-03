import assert from 'assert';
import moment from 'moment';

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
      let results = {
        topicsCovered: metaData.aggregations.topics_covered.value,
        pageViews: sectionData.hits.total,
        socialReaders: 0,
        readTimes: formatAggregation('page_views_over_time', sectionData),
        genre: [], //metaData.genre,
        sections: [],//metaData.sections,
        topics: [],//metaData.topics,
        referrer_types: filterOutTerms(formatFilteredAggregation('referrer_types', sectionData), ['search', 'unknown', 'partner', 'social-network', 'email']),
        referrer_names: formatFilteredAggregation('referrer_names', sectionData),
        social_referrers: filterOutTerms(formatFilteredAggregation('social_referrers', sectionData), ['Facebook', 'Twitter', 'Linked-In']),
        devices : formatAggregation('devices', sectionData),
        countries : formatAggregation('countries', sectionData),
        regions : formatAggregation('regions', sectionData),
        user_cohort : formatAggregation('user_cohort', sectionData),
        rfv_cluster : formatAggregation('rfv_cluster', sectionData),
        is_first_visit : formatAggregation('is_first_visit', sectionData),
        internal_referrer_types: formatFilteredAggregation('internal_referrer_types', sectionData),
        is_subscription : formatAggregation('is_subscription', sectionData),
        unique_visitors : sectionData.aggregations.unique_visitors.value
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
    let key = replacement || 'Unknown';
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
