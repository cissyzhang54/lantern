import assert from 'assert';

export default function formatData(data) {

  try {

    assert.equal(Object.prototype.toString.call(data.hits), '[object Array]',
      "argument 'data' should be an array");
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }


  return new Promise((resolve, reject) => {
    try {
      let results = {
        results: [],
        total: data.total
      }
      if (!data.hits.length) {
        return resolve(results);
      }

      results.results = data.hits.map((hit) => {
        if (!hit.hasOwnProperty('_source')) {
          throw new Error('Unparseable data');
        }
        return hit._source;
      });

      resolve(results);

    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });

}
