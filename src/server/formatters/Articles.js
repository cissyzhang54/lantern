import assert from 'assert';
import moment from 'moment';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

    assert.equal(data.length, 3,
      "argument 'data' should be an array of length 3");

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

    assert.equal(typeof data[1], 'object',
      "the second element of 'data' should be an object");

    assert.equal(typeof data[2], 'object',
      "the third element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  return new Promise((resolve, reject) => {
    try {
      let [articleData, metaData, eventData] = data;
      let results = {
        title: metaData.title,
        uuid: metaData.article_uuid,
        author: metaData.authors,
        published: metaData.initial_publish_date,
        published_human: formatPublishDate(metaData.initial_publish_date),
        pageViews: articleData.hits.total,
        timeOnPage: articleData.aggregations.avg_time_on_page.value,
        readTimes: formatAggregation('page_views_over_time', articleData),
        readTimesSincePublish: formatAggregation('page_views_since_publish', articleData),
        genre: metaData.genre,
        sections: metaData.sections,
        topics: metaData.topics,
        channels: formatAggregation('channels', articleData),
        referrer_types: filterOutTerms(format(articleData.aggregations.referrer.types), ['search', 'unknown', 'partner', 'social-network', 'email']),
        referrer_names: format(articleData.aggregations.referrer.names),
        referrer_urls: format(articleData.aggregations.referrer.urls.filtered),
        social_referrers: filterOutTerms(formatFilteredAggregation('social_referrers', articleData), ['Facebook', 'Twitter', 'Linked-In']),
        devices : formatAggregation('devices', articleData),
        countries : formatAggregation('countries', articleData),
        regions : formatAggregation('regions', articleData),
        is_last_page : formatAggregation('is_last_page', articleData),
        user_cohort : formatAggregation('user_cohort', articleData),
        rfv_cluster : formatAggregation('rfv_cluster', articleData),
        is_first_visit : formatAggregation('is_first_visit', articleData),
        internal_referrer_urls: format(articleData.aggregations.internal_referrer.urls),
          internal_referrer_types: format(articleData.aggregations.internal_referrer.types),
        next_internal_url : formatAggregation('next_internal_url', articleData),
        is_subscription : formatAggregation('is_subscription', articleData),
        total_comments_posted : eventData.aggregations.page_comments.posts.total.value,
        total_comments_viewed : eventData.aggregations.page_comments.views.doc_count,
        social_shares_total: eventData.aggregations.social_shares.doc_count,
        social_shares_types : formatFilteredAggregation('social_shares', eventData),
        total_links_clicked : eventData.aggregations.page_clicks.total_links_clicked.value,
        scroll_depth: Math.round(eventData.aggregations.scroll_depth.average_scroll.value),
        link_click_categories : eventData.aggregations.page_clicks.category_breakdown,
        unique_visitors : articleData.aggregations.unique_visitors.value
      };

      resolve(results);

    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });

function formatPublishDate(date) {
  return moment(date).fromNow();
}

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
      } else if (typeof d.key !== "undefined" && d.key !== ''){
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
