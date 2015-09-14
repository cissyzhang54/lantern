import assert from 'assert';
import moment from 'moment';

export default function formatData(data) {
  try {
    assert.equal(typeof data, 'object',
      "argument 'data' should be an object");
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }


  return new Promise((resolve, reject) => {
    try {


      let articleData = data.hits.hits[0]._source;
      let results = {
        article: {
          title: articleData.title,
          uuid: articleData.article_uuid,
          author: formatAuthors(articleData.authors),
          published: articleData.initial_publish_date,//formatPublishDate(articleData.initial_publish_date),
          published_human: formatPublishDate(articleData.initial_publish_date),
          pageViews: data.hits.total,
          timeOnPage: "n/a",
          socialReaders: "n/a",
          readTimes: formatTimeSeries(data),
          genre: articleData.genre,
          sections: articleData.sections,
          topics: articleData.topics
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
