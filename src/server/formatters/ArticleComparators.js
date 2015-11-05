import assert from 'assert';
import getField from '../utils/universalDataFormatter';

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
  let [articleData, eventData] = data;
  let divisor = getField(articleData, 'category_article_count')
  let articleFields = [
    'comparator', 'timeOnPage', 'page_views_over_time', 'category_total_view_count',
    'category_article_count', 'category_average_view_count', 'unique_visitors'
  ]
  let articleAverages = [
    'readTimes', 'readTimesSincePublish', 'referrer_types', 'social_referrers', 'regions',
    'is_last_page', 'user_cohort', 'rfv_cluster', 'is_first_visit', 'internal_referrer_types',
  ]
  let eventFields = ['scroll_depth']
  let eventAverages = [
    'social_shares_total', 'social_shares_types', 'total_links_clicked', 'total_comments_posted', 'total_comments_viewed'
  ]
  return new Promise((resolve, reject) => {
    try {
      let results = {}
      articleFields.forEach(f => { results[f] = getField(articleData, f)})
      articleAverages.forEach(f => { results[f] = getField(articleData, f, divisor)})
      eventFields.forEach(f => { results[f] = getField(eventData, f)})
      eventAverages.forEach(f => { results[f] = getField(eventData, f, divisor)})
      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
