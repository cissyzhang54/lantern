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
          readTimes: formatTimeSeries(data)
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
