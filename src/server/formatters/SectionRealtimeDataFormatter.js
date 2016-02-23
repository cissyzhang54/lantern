import assert from 'assert';
import getField from '../utils/universalDataFormatter.js';
import RealtimeArticleListFormatter from './RealtimeArticleListFormatter';

export default function formatData(data) {
  try {

    assert.equal(typeof data, 'object',
      "data should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    throw error;
  }

  let realtimeFields = [
    'realtimePageViews',
    'realtimeTopicsCovered',
    'realtimeArticlesPublished'
  ];
  let results = {}

  try {
    realtimeFields.forEach(f => {
      results[f] = getField(data, f)
    });
    results.articleList = RealtimeArticleListFormatter(data);
    return results;
  } catch (e) {
    let error = new Error(e);
    error.message = 'DataParsingError';
    error.response = data;
    error.originalError = e;
    throw error;
  }
}
