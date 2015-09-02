import request from "superagent";
import ArticleActions from "../actions/ArticleActions";
import config from "../config";

let DataAPI = {

    getArticleData(query, apiKey) {

        return new Promise(function (resolve, reject) {
            let url = config.baseUrl + '/api/v0/articles/' + query.uuid;
            if (apiKey) {
                url += "?apiKey=" + apiKey;
            }
            request.post(url)
                .send(query)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res.body);
                });
        });
    }
};

export default DataAPI;