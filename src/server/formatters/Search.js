import assert from 'assert';

export default function formatData(data) {

  try {
    assert.equal(Object.prototype.toString.call(data), '[object Array]',
      "argument 'data' should be an array");
  } catch (e) {
    let error = new Error(e);
    error.name = 'MalformedArgumentsError';
    error.data = data;
    return Promise.reject(error);
  }


  return new Promise((resolve, reject) => {
    try {

      if (!data.length) {
        return resolve([]);
      }

      let processed = data.map((hit) => {
        if (!hit.hasOwnProperty('_source')) {
          throw new Error('Unparseable data');
        }
        return hit._source;
      });

      resolve(processed);

    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(error);
    }
  });

}
