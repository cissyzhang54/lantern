import assert from 'assert';
import getField from '../utils/universalDataFormatter';

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

  let articleData = data;

  let articleFields = [
    'timeOnPageTop',
    'topArticleViews',
    'topArticlesSearchRef',
    'topArticlesSocialRef',
    'topArticlesRetention',
    'topArticlesCommentPosts'
  ]

  let results = {};

  return new Promise((resolve, reject) => {
    try {
      articleFields.forEach(f => {
        results[f] = getField(articleData, f)
      });
      resolve({
        data:results
      });
    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });
}
