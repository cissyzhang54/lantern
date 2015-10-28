import assert from 'assert';
import moment from 'moment';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an object");
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    try {
      let [articleData, eventData] = data;
      eventData.aggregations.distinct_articles = articleData.aggregations.distinct_articles;

      let results = {
        article: {
          comparator: articleData.comparator,
          timeOnPage: articleData.aggregations.avg_time_on_page.value,
          page_views_over_time : articleData.aggregations.page_views_over_time,
          category_total_view_count : articleData.aggregations.page_view_total_count.value,
          category_article_count: articleData.aggregations.distinct_articles.value,
          category_average_view_count: (articleData.aggregations.page_view_total_count.value / articleData.aggregations.distinct_articles.value) | 0,
          readTimes: formatAggregation('page_views_over_time', articleData),
          readTimesSincePublish: formatAggregation('page_views_since_publish', articleData),
          referrer_types: filterOutTerms(formatFilteredAggregation('referrer_types', articleData), ['search', 'unknown', 'partner', 'social-network', 'email']),
          social_referrers: filterOutTerms(formatFilteredAggregation('social_referrers', articleData), ['Facebook', 'Twitter', 'Linked-In']),
          regions : formatAggregation('regions', articleData),
          is_last_page : formatAggregation('is_last_page', articleData),
          user_cohort : formatAggregation('user_cohort', articleData),
          rfv_cluster : formatAggregation('rfv_cluster', articleData),
          is_first_visit : formatAggregation('is_first_visit', articleData),
          internal_referrer_types: formatFilteredAggregation('internal_referrer_types', articleData),
          social_shares_total : eventData.aggregations.social_shares.doc_count,
          social_shares_types : formatFilteredAggregation("social_shares", eventData)
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
    let key = replacement || 'Unknown';
    if (typeof d.key_as_string !== "undefined"){
      key = d.key_as_string
    } else if (typeof d.key !== "undefined"){
      key = d.key
    }
    return [
      key,
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
