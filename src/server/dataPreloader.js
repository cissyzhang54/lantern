import express from 'express';
import request from "superagent";
import dataApiUtils from '../shared/utils/DataAPIUtils';

let router = express.Router();

router.get('/articles/:uuid', (req, res, next) => {

    dataApiUtils.getArticleData({uuid: req.params.uuid})
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

