import express from 'express';
import request from "superagent";
import dataApiUtils from '../shared/utils/DataAPIUtils';

let router = express.Router();
let apiKey = process.env.LANTERN_API_KEY;

router.get('/articles/:uuid', (req, res, next) => {

    dataApiUtils.getArticleData({uuid: req.params.uuid}, apiKey)
        .then((data) => {
            res.locals.data = {
                "ArticleStore": {
                    data: data
                }
            };
            next();
        })
        .catch((err) => {
            next(new Error(err));
        })
});

export default router;

