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
      //todo: throw + catch properly then test it
      //yeah well you asshole left the company so fuck you
    }
  }

  return field.formatter ? field.formatter(parent, field, divisor, field.bucket_key) : parent
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
  realtimePageViews: {
    name: 'aggregations.page_views.filtered',
    formatter: format
  },
  realtimeTimeOnPage: {
    name: 'aggregations.time_on_page_last_hour.time_on_page_histogram',
    formatter: format,
    bucket_key: 'time_on_page_avg'
  },
  realtimeScrollDepth: {
    name: 'aggregations.scroll_depth_last_hour.scroll_depth_last_hour_histogram',
    formatter: format,
    bucket_key: 'scroll_depth_last_hour_avg'
  },
  realtimeRetention: {
    name: 'aggregations.retention_rate.retention_last_hour_histogram',
    formatter: format,
    bucket_key: 'retention_last_hour_count'
  },
  realtimeLinksClickedByCategory: {name: 'aggregations.links_clicked_by_category_last_hour.categories', formatter: format},
  timeOnPageLastHour: {
    name: 'aggregations.time_on_page_last_hour.time_on_page_avg.value',
    formatter: Math.round
  },
  scrollDepthLastHour: {
    name: 'aggregations.scroll_depth_last_hour.scroll_depth_last_hour_avg.value',
    formatter: Math.round
  },
  referrerLastHourTypes: {name: 'aggregations.referrer_last_hour.types', formatter: formatAndFilter, terms: ['search', 'unknown', 'partner', 'social-network', 'email']},
  referrerLastHourNames: {name: 'aggregations.referrer_last_hour.names', formatter: format},
  referrerLastHourUrls: {name: 'aggregations.referrer_last_hour.urls', formatter: format},
  internalReferrerLastHourTypes: {name: 'aggregations.internal_referrer_last_hour.types', formatter: formatAndFilter, terms: ['search', 'unknown', 'partner', 'social-network', 'email']},
  internalReferrerLastHourUrls: {name: 'aggregations.internal_referrer_last_hour.urls', formatter: format},
  socialReferrersLastHour: {name: 'aggregations.referrer_last_hour.names', formatter: formatAndFilter, terms: ['Facebook', 'Twitter', 'Linked-In']},
  retentionRate: 'aggregations.retention_rate.filtered.value',
  livePageViews: {name: 'aggregations.live_page_views.filtered.value', formatter: Math.round},
  timeOnPage: 'aggregations.avg_time_on_page.value',
  topicCount: {name: 'aggregations.topic_count', formatter: format},
  topicViews: {name: 'aggregations.topic_views', formatter: format},
  sectionCount: {name: 'aggregations.section_count', formatter: format},
  sectionViews: {name: 'aggregations.section_views', formatter: format},
  topicsCovered: 'aggregations.topics_covered.value',
  sectionsCovered: 'aggregations.sections_covered.value',
  articleCount: 'aggregations.distinct_articles.value',
  categoryTotalViewCount: 'aggregations.page_view_total_count.value',
  categoryAverageViewCount: {name: 'aggregations.page_view_total_count.value', formatter: divide},
  categoryAverageUniqueVisitors: {name: 'aggregations.unique_visitors.value', formatter: divide},
  readTimes: {name: 'aggregations.page_views_over_time', formatter: format},
  readTimesSincePublish: {name: 'aggregations.page_views_since_publish', formatter: format},
  publishTimes: {name: 'aggregations.articles_published_over_time', formatter: format},
  channels: {name: 'aggregations.channels', formatter: format},
  referrerTypes: {name: 'aggregations.referrer.types', formatter: formatAndFilter, terms: ['search', 'unknown', 'partner', 'social-network', 'email']},
  referrerNames: {name: 'aggregations.referrer.names', formatter: format},
  referrerUrls: {name: 'aggregations.referrer.urls.filtered', formatter: format},
  socialReferrers: {name: 'aggregations.social_referrers.filtered', formatter: formatAndFilter, terms: ['Facebook', 'Twitter', 'Linked-In']},
  devices: {name: 'aggregations.devices', formatter: format},
  countries: {name: 'aggregations.countries', formatter: format},
  regions: {name: 'aggregations.regions', formatter: format},
  isLastPage: {name: 'aggregations.is_last_page', formatter: format},
  userCohort: {name: 'aggregations.user_cohort', formatter: format},
  rfvCluster: {name: 'aggregations.rfv_cluster', formatter: format},
  isFirstVisit: {name: 'aggregations.is_first_visit', formatter: format},
  internalReferrerUrls: {name: 'aggregations.internal_referrer.urls', formatter: format},
  internalReferrerTypes: {name: 'aggregations.internal_referrer.types', formatter: format},
  nextInternalUrl: {name: 'aggregations.next_internal_url', formatter: format},
  isSubscription: {name: 'aggregations.is_subscription', formatter: format},
  totalCommentsPosted: {name: 'aggregations.page_comments.posts.total.value', formatter: divide},
  totalCommentsViewed: {name: 'aggregations.page_comments.views.doc_count', formatter: divide},
  socialSharesTotal: {name: 'aggregations.social_shares.doc_count', formatter: divide},
  socialSharesTypes: {name: 'aggregations.social_shares.filtered', formatter: format},
  totalLinksClicked: {name: 'aggregations.page_clicks.total_links_clicked.value', formatter: divide},
  scrollDepth: {name: 'aggregations.scroll_depth.average_scroll.value', formatter: Math.round},
  linkClickCategories: 'aggregations.page_clicks.category_breakdown',
  uniqueVisitors: 'aggregations.unique_visitors.value',
  realtimeNextInternalUrl : 'aggregations.next_internal_url.titles.buckets',
  linksClickedLastHour : 'aggregations.links_clicked_last_hour.doc_count',
  socialSharesLastHour : 'aggregations.social_shares_last_hour.doc_count',
  timeOnPageTop: 'aggregations.time_on_page.buckets',
  commentsLastHour : 'aggregations.comments_last_hour.doc_count',
  commentsReadLastHour : 'aggregations.comments_last_hour.doc_count',
  topArticleViews: 'aggregations.top_article_views.buckets',
  topArticlesCommentPosts : 'aggregations.top_article_comments_posted.buckets',
  topArticlesSocialRef: 'aggregations.top_articles_social_ref.buckets',
  topArticlesSearchRef: 'aggregations.top_articles_search_ref.buckets',
  topArticlesRetention: 'aggregations.top_articles_retention.retained.buckets'
}

function divide(agg, fieldObj, divisor=1){
  return Math.round(agg / divisor)
}
function formatAndFilter(agg, fieldObj, divisor){
  return filterOutTerms(format(agg, fieldObj, divisor), fieldObj.terms)
}

function formatPublishDate(date) {
  return moment(date).format('MMMM D, YYYY h:mm a');
}

function format(agg, fieldObj, divisor=1, bucket_key='doc_count') {
  if (!agg){
    //todo: throw + catch properly then test it
    return new Error(`formatterError: ${fieldObj && fieldObj.name ? fieldObj.name : fieldObj} does not exist in the data`)
  }
  return agg.buckets.map((d) => {
    let key = 'Unknown';
    if (typeof d.key_as_string !== "undefined"){
      key = d.key_as_string
    } else if (typeof d.key !== "undefined" && d.key !== ''){
      key = d.key
    }
    let value = d.doc_count;
    if (bucket_key !== 'doc_count') {
      value = d[bucket_key].value;
    }
    return [
      key,
      Math.round(value / divisor)
    ];
  });
}

// In place of min doc count in ES for specific fields, use min doc count to return
// all fields with 0 then filter the specific fields that are always required even when 0
// and remove the rest of the fields with a 0 value
function filterOutTerms (data, terms) {
  return data.filter((value) => (terms.indexOf(value[0]) >= 0 || value[1] > 0));
}

export default getField
