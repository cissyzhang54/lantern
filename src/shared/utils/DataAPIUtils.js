import request from "superagent";
import ArticleActions from "../actions/ArticleActions";
import config from "../config";

let DataAPI = {

    getArticleData(query) {

        return new Promise(function (resolve, reject) {
            let url = config.baseUrl + '/api/v0/articles/' + query.uuid;
            request.post(url)
                .send(query)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        reject('Things have broken');
                    }
                    resolve(res.body);
                });
        });
    }
};

export default DataAPI;