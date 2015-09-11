export default function formatData(data) {

  return new Promise((resolve, reject) => {
    try {
      if (!data.length) {
        return resolve([]);
      }

      resolve(data.map((hit) => {
        return hit._source;
      }));

    } catch (e) {
      let error = new Error(e);
      error.name = 'DataParsingError';
      error.response = data;
      reject(e);
    }
  });

}
