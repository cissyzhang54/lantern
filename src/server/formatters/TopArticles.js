import assert from 'assert';
import getField from '../utils/universalDataFormatter';

export default function formatData(data) {
  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  let [articleData, eventData] = data;

  let articleFields = [
    'timeOnPageTop', 'topArticleViews', 'topArticlesSearchRef'
  ]

  let eventFields = [
    'topArticlesCommentPosts'
  ]

  let results = {};

  return new Promise((resolve, reject) => {
    try {
      articleFields.forEach(f => { results[f] = getField(articleData, f)})
      eventFields.forEach(f => { results[f] = getField(eventData, f)})
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
