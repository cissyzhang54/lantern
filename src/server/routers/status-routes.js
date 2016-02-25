import express from "express";
import getStatus from '../utils/dataImportStatusPoller';

let router = express.Router();

router.use('/', function (req, res) {
  let numberOfActivePollers = req.app.locals.realtimeServer.getNumberOfActivePollers();
  let status = getStatus();

  status.activePollers = numberOfActivePollers;

  res.status(200).json(status).end();
});

export default router;
