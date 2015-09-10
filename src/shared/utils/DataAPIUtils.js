import request from "superagent";
import ArticleActions from "../actions/ArticleActions";
import config from "../config";

let DataAPI = {

    getArticleData(query, apiKey) {
        return new Promise(function handlePromise(resolve, reject) {
            let url = config.baseUrl + '/api/v0/articles/' + query.uuid;
            if (apiKey) {
                url += "?apiKey=" + apiKey;
            }
            request.post(url)
                .send(query)
                .set('Accept', 'application/json')
                .end(function doneLoadingArticleData(err, res)  {
                    if (err) {
                      err.queryData = query;
                      switch(err.response.status) {
                        case 404:
                          err.name = 'ArticleNotFoundError';
                          break;
                        default:
                          err.name = 'ArticleFetchError';
                          break;
                      }
                      reject(err);
                    }
                    resolve(res.body);
                });
        });
    }
};

export default DataAPI;
