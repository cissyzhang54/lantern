import express from "express";
import getStatus from '../utils/dataImportStatusPoller';

let router = express.Router();

router.use('/', function (req, res) {
  res.status(200).json(getStatus()).end();
});

export default router;
