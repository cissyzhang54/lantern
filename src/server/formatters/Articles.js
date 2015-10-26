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
      let [articleData, metaData, eventsData] = data;
      let results = {
        article: {
          title: metaData.title,
          uuid: metaData.article_uuid,
          author: metaData.authors,
          published: metaData.initial_publish_date,
          published_human: formatPublishDate(metaData.initial_publish_date),
          pageViews: articleData.hits.total,
          timeOnPage: articleData.aggregations.avg_time_on_page.value,
          socialReaders: 0,
          readTimes: formatAggregation('page_views_over_time', articleData),
          readTimesSincePublish: formatAggregation('page_views_since_publish', articleData),
          genre: metaData.genre,
          sections: metaData.sections,
          topics: metaData.topics,
          channels: formatAggregation('channels', articleData),
          referrer_types: filterOutTerms(formatFilteredAggregation('referrer_types', articleData), ['search', 'unknown', 'partner', 'social-network', 'email']),
          referrer_names: formatFilteredAggregation('referrer_names', articleData),
          referrer_urls: formatFilteredAggregation('referrer_urls', articleData, 'Not Available'),
          social_referrers: filterOutTerms(formatFilteredAggregation('social_referrers', articleData), ['Facebook', 'Twitter', 'Linked-In']),
          devices : formatAggregation('devices', articleData),
          countries : formatAggregation('countries', articleData),
          regions : formatAggregation('regions', articleData),
          is_last_page : formatAggregation('is_last_page', articleData),
          user_cohort : formatAggregation('user_cohort', articleData),
          rfv_cluster : formatAggregation('rfv_cluster', articleData),
          is_first_visit : formatAggregation('is_first_visit', articleData),
          internal_referrer_urls: formatFilteredAggregation('internal_referrer_urls', articleData, 'Not Available'),
          internal_referrer_types: formatFilteredAggregation('internal_referrer_types', articleData),
          next_internal_url : formatAggregation('next_internal_url', articleData),
          is_subscription : formatAggregation('is_subscription', articleData),
          social_shares_total: eventsData.hits.total,
          social_shares_types : formatAggregation('social_shares', eventsData)
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
