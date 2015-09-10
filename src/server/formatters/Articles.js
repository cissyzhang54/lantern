import moment from 'moment';

export default function formatData(data) {
  return new Promise((resolve, reject) => {
    try {
      let articleData = data.hits.hits[0]._source;

      resolve({
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
      });
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(e);
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
