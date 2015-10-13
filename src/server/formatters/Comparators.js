import assert from 'assert';
import moment from 'moment';

export default function formatData(data) {

  try {
    assert.equal(Object.prototype.toString.call(data), '[object Object]',
      "argument 'data' should be an object");
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    try {
      let results = {
        article: {
          comparator: data.comparator,
          timeOnPage: data.aggregations.avg_time_on_page.value,
          page_views_over_time : data.aggregations.page_views_over_time,
          category_total_view_count : data.aggregations.page_view_total_count.value,
          category_article_count: data.aggregations.distinct_articles.value,
          category_average_view_count: (data.aggregations.page_view_total_count.value / data.aggregations.distinct_articles.value) | 0,
          readTimes: formatAggregation('page_views_over_time', data),
          referrer_types: filterOutTerms(formatFilteredAggregation('referrer_types', data), ['search', 'unknown', 'partner', 'social-network', 'email']),
          social_referrers: filterOutTerms(formatFilteredAggregation('social_referrers', data), ['Facebook', 'Twitter', 'Linked-In']),
          regions : formatAggregation('regions', data),
          is_last_page : formatAggregation('is_last_page', data),
          user_cohort : formatAggregation('user_cohort', data),
          rfv_cluster : formatAggregation('rfv_cluster', data),
          is_first_visit : formatAggregation('is_first_visit', data),
          internal_referrer_types: formatFilteredAggregation('internal_referrer_types', data)
        }
      };

      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}

function formatAggregation(name, data, replacement) {
  return format(data, data.aggregations[name], replacement)
}

function formatFilteredAggregation(name, data, replacement) {
  return format(data, data.aggregations[name].filtered, replacement)
}

function format(data, agg, replacement) {
  return agg.buckets.map((d, i) => {
    return [
      d.key_as_string || d.key || replacement || 'Unknown',
      (d.doc_count / data.aggregations.distinct_articles.value) | 0
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
}
