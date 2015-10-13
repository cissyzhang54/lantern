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
          readTimes: formatTimeSeries(data),
          referrer_types: formatFilteredAggregation('referrer_types', data),
          social_referrers: formatFilteredAggregation('social_referrers', data),
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

function formatTimeSeries(data) {
  let buckets = data.aggregations.page_views_over_time.buckets;
  return buckets.map((d, i) => {
    return {
      time: d.key_as_string,
      comparator: (d.doc_count / data.aggregations.distinct_articles.value) | 0
    };
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
      d.key || replacement || 'Unknown',
      (d.doc_count / data.aggregations.distinct_articles.value) | 0
    ];
  });
}
