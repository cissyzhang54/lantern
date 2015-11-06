import moment from 'moment';

function getField(d, f, divisor){
  let field = fields[f]
  if (!field){
    return new Error(`formatterError: ${f} does not have a formatter set in the 'fields' object`)
  }
  let objs = (field.name || field).split('.')
  let parent = d;
  while(objs.length){
    let child = objs.shift();
    try {
      parent = parent[child]
    } catch (e){
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.data = d;
    }
  }
  return field.formatter ? field.formatter(parent, field, divisor) : parent
}

const fields = {
  title : 'title',
  comparator : 'comparator',
  uuid : 'article_uuid',
  author : 'authors',
  genre : 'genre',
  sections : 'sections',
  topics : 'topics',
  published: 'initial_publish_date',
  published_human: {name:'initial_publish_date', formatter: formatPublishDate},
  pageViews: 'hits.total',
  timeOnPage: 'aggregations.avg_time_on_page.value',
  topic_count: {name: 'aggregations.topic_count', formatter: format},
  topic_views: {name: 'aggregations.topic_views', formatter: format},
  topicsCovered: 'aggregations.topics_covered.value',
  articleCount: 'aggregations.distinct_articles.value', //duplicate!
  category_article_count: 'aggregations.distinct_articles.value', //duplicate!
  distinctArticleCount: 'aggregations.distinct_articles.value', //duplicate!
  category_total_view_count: 'aggregations.page_view_total_count.value',
  category_average_view_count: {name: 'aggregations.page_view_total_count.value', formatter: divide},
  page_views_over_time: 'aggregations.page_views_over_time', //duplicate!
  readTimes: {name: 'aggregations.page_views_over_time', formatter: format}, //duplicate!
  readTimesSincePublish: {name: 'aggregations.page_views_since_publish', formatter: format},
  channels: {name: 'aggregations.channels', formatter: format},
  referrer_types: {name: 'aggregations.referrer.types', formatter: formatAndFilter, terms: ['search', 'unknown', 'partner', 'social-network', 'email']},
  referrer_names: {name: 'aggregations.referrer.names', formatter: format},
  referrer_urls: {name: 'aggregations.referrer.urls.filtered', formatter: format},
  social_referrers: {name: 'aggregations.social_referrers.filtered', formatter: formatAndFilter, terms: ['Facebook', 'Twitter', 'Linked-In']},
  devices: {name: 'aggregations.devices', formatter: format},
  countries: {name: 'aggregations.countries', formatter: format},
  regions: {name: 'aggregations.regions', formatter: format},
  is_last_page: {name: 'aggregations.is_last_page', formatter: format},
  user_cohort: {name: 'aggregations.user_cohort', formatter: format},
  rfv_cluster: {name: 'aggregations.rfv_cluster', formatter: format},
  is_first_visit: {name: 'aggregations.is_first_visit', formatter: format},
  internal_referrer_urls: {name: 'aggregations.internal_referrer.urls', formatter: format},
  internal_referrer_types: {name: 'aggregations.internal_referrer.types', formatter: format},
  next_internal_url: {name: 'aggregations.next_internal_url', formatter: format},
  is_subscription: {name: 'aggregations.is_subscription', formatter: format},
  total_comments_posted: {name: 'aggregations.page_comments.posts.total.value', formatter: divide},
  total_comments_viewed: {name: 'aggregations.page_comments.views.doc_count', formatter: divide},
  social_shares_total: {name: 'aggregations.social_shares.doc_count', formatter: divide},
  social_shares_types: {name: 'aggregations.social_shares.filtered', formatter: format},
  total_links_clicked: {name: 'aggregations.page_clicks.total_links_clicked.value', formatter: divide},
  scroll_depth: {name: 'aggregations.scroll_depth.average_scroll.value', formatter: Math.round},
  link_click_categories: 'aggregations.page_clicks.category_breakdown',
  unique_visitors: 'aggregations.unique_visitors.value',
}

function divide(agg, fieldObj, divisor=1){
  return Math.round(agg / divisor)
}
function formatAndFilter(agg, fieldObj, divisor){
  return filterOutTerms(format(agg, fieldObj, divisor), fieldObj.terms)
}

function formatPublishDate(date, fieldObj, divisor) {
  return moment(date).fromNow();
}

function format(agg, fieldObj, divisor=1) {
  if (!agg){
    return new Error(`formatterError: ${fieldObj && fieldObj.name ? fieldObj.name : fieldObj} does not exist in the data`)
  }
  return agg.buckets.map((d, i) => {
    let key = 'Unknown';
    if (typeof d.key_as_string !== "undefined"){
      key = d.key_as_string
    } else if (typeof d.key !== "undefined" && d.key !== ''){
      key = d.key
    }
    return [
      key,
      Math.round(d.doc_count / divisor)
    ];
  });
}

// In place of min doc count in ES for specific fields
// filter the specific always required fields required here
function filterOutTerms (data, terms) {
  return data.filter((value) => (terms.indexOf(value[0]) >= 0 || value[1] > 0));
}

export default getField
