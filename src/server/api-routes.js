import express from "express";
import bodyParser from "body-parser";
import data from "./fake_data";
import uuid from "uuid";

let router = express.Router();
router.use(bodyParser.json());

router.get('/:category(articles|topics|authors)/:uuid', category);
router.post('/:category(articles|topics|authors)/:uuid', category);
router.post('/search', search);

function category(req, res) {
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
}

function search(req, res) {
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
}

export default router;
