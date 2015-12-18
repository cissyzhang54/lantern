import assert from 'assert';
import getField from '../utils/universalDataFormatter.js';

export default function formatData(data) {
  try {
    assert.equal(Array.isArray(data), true,
      "argument 'data' should be an array");

    assert.equal(data.length, 2,
      "argument 'data' should have length 2")

    assert.equal(typeof data[0], 'object',
      "the first element of 'data' should be an object");

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  let [realtimeData, allData] = data;

  let metaFields = [
    'title',
    'uuid',
    'author',
    'published',
    'published_human',
    'genre',
    'sections',
    'topics'
  ]
  let realtimeFields = [
    'realtimePageViews',
    'realtimeTimeOnPage',
    'realtimeScrollDepth',
    'timeOnPageLastHour',
    'scrollDepthLastHour',
    'livePageViews',
    'linksClickedLastHour'
  ];
  let realtimeFieldsAllDataFields = [
    'realtimeNextInternalUrl'
  ]

  let results = {}
  return new Promise((resolve, reject) => {
    try {
      realtimeFields.forEach(f => {
        results[f] = getField(realtimeData, f)
      });
      realtimeFieldsAllDataFields.forEach(f => {
        results[f] = getField(allData, f)
      });
      if (realtimeData.hits.hits.length) {
        metaFields.forEach(f => {
          results[f] = getField(realtimeData.hits.hits[0]._source, f)
        });
      }

      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.message = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  })
}
