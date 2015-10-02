import assert from 'assert';
import moment from 'moment';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

    assert.equal(data.length, 2,
      "argument 'data' should be an array of length 2");

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

      let [articleData, metaData] = data;
      let results = {
        article: {
          title: metaData.title,
          uuid: metaData.article_uuid,
          author: formatAuthors(metaData.authors),
          published: metaData.initial_publish_date,//formatPublishDate(articleData.initial_publish_date),
          published_human: formatPublishDate(metaData.initial_publish_date),
          pageViews: articleData.hits.total,
          timeOnPage: articleData.aggregations.avg_time_on_page.value,
          socialReaders: "n/a",
          readTimes: formatTimeSeries(articleData),
          genre: metaData.genre,
          sections: metaData.sections,
          topics: metaData.topics,
          channels: formatTermsAggregation('channels', articleData),
          referrer_types: formatTermsAggregation('referrer_types', articleData),
          referrer_names: formatTermsAggregation('referrer_names', articleData),
          devices : formatTermsAggregation('devices', articleData)
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


function formatAuthors(authors) {
  if (authors.length) {
    return 'Anonymous';
  }

  let lastAuthor = authors.pop();
  if (!authors.length) {
    return lastAuthor;
  }
  return authors.join(", ") + ' and ' + lastAuthor;
}


function formatPublishDate(date) {
  let m = moment(date);
  return m.fromNow();
}

function formatTimeSeries(data) {
  let buckets = data.aggregations.page_views_over_time.buckets;
  return buckets.map((d, i) => {
    return {
      time: d.key_as_string,
      value: d.doc_count
    };
  });
}

function formatTermsAggregation(name, data) {
  let buckets = data.aggregations[name].buckets;
  return buckets.map((d, i) => {
    return [
      d.key,
      d.doc_count
    ];
  });
}
