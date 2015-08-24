import express from "express";
import bodyParser from "body-parser";
import data from "./fake_data";
import uuid from "uuid";

let router = express.Router();
router.use(bodyParser.json());

router.get('/:category(articles|topics|authors)/:uuid', function (req, res) {
  let obj;

  switch (req.params.category) {
    case 'articles':
      // obj = Object.assign({}, {uuid: req.params.uuid}, data.article);
      obj = data.article;
      obj.uuid = req.params.uuid;
      res.json(obj);
      break;
    default:
      res.json({
        uuid: req.params.uuid,
        category: req.params.category
      });
  }

});

router.post('/search', function(req, res) {
  let obj;

  let query = req.body;

  res.json({
    'results' : [
      {
        'type': 'article',
        title: 'Some thing some thing',
        uuid: uuid.v4()
      }
    ]
  });

});

export default router;
