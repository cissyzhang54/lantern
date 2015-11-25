import assert from 'assert';
import getField from '../utils/universalDataFormatter.js';

export default function formatData(data) {
  try {
    assert.equal(Array.isArray(data), true,
      "argument 'data' should be an array");

    assert.equal(data.length, 1,
      "argument 'data' should have length 1")

  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }

  let [realtimeData] = data;
  let realtimeFields = ['realtimePageViews'];

  let results = {}
  return new Promise((resolve, reject) => {
    try {
      realtimeFields.forEach(f => {
        results[f] = getField(realtimeData, f)
      });
      resolve(results);
    } catch (e) {
      let error = new Error(e);
      error.message = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  })
}
