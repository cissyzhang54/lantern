import elasticsearch from 'elasticsearch';
import ArticlesQuery from './queries/Articles';
import Logger from './logger';


var client = elasticsearch.Client({
  host: [
    {
      host: process.env.ES_HOST,
      port: process.env.ES_PORT,
      auth: process.env.ES_USER + ':' + process.env.ES_PASS,
      protocol: 'https'
    }
  ],
  log: Logger
});

export default function runQuery(category, queryData) {
  switch (category) {
    case 'articles':
      return runArticleQuery(queryData);
    default:
      return null;
  }
  console.dir(p);
  return p;
}

function runArticleQuery(queryData) {

  return new Promise((resolve, reject) => {
    let queryObject = ArticlesQuery(queryData);
    client.search({
      index: process.env.ES_INDEX_ROOT + '*',
      body: queryObject
    }, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
}
