import EventEmitter from 'events';
import util from 'util';
import {runArticleRealtimeQuery} from './esClient.js';
import ArticleRealtimeDataFormatter from './formatters/ArticleRealtimeDataFormatter.js';
import moment from 'moment';

const FORMAT_START = 'YYYY-MM-DDTHH:mm:00.000[Z]';
const FORMAT_END = 'YYYY-MM-DDTHH:mm:59.999[Z]';
export default function ArticlePoller(uuid) {
  this.uuid = uuid;
  this.lastPolled = moment();
  // XXX make this like configurable and stuff ;_;
  this.interval = 5000;
  EventEmitter.call(this);
  // then we immediately getArticleData which triggers
  // the polling
  this.getArticleData();
}

util.inherits(ArticlePoller, EventEmitter);

// Polls for an article data and emits an event with
// the updated data
ArticlePoller.prototype.getArticleData = function() {
  const query = {
    dateFrom: this.lastPolled.format(FORMAT_START),
    dateTo: this.lastPolled.format(FORMAT_END),
    uuid: this.uuid
  }
  runArticleRealtimeQuery(query)
  .then(ArticleRealtimeDataFormatter)
  .then(results => {
    this.emit('updatedArticleData', results);
    this.waitAndPoll();
  })
  .catch((err) => {
    let error = new Error(err);
    error.uuid = this.uuid;
    error.name = 'LoadingDataError'
    error.lastPolled = this.lastPolled;
    error.originalError = err;
    this.emit('error', error);
  });
  // XXX yo let's assume it's a perfect world and we just
  // use out timestamp for the lastPolled value but we might
  // have to use the results (i.e. the last value of the aggs
  // to choose the lastPolled value
  this.lastPolled = moment();
}

// This guy here waits for a set time and then
// requests article data.
ArticlePoller.prototype.waitAndPoll = function() {
  this.timeoutId = setTimeout(this.getArticleData.bind(this), this.interval)
}

// Stop
ArticlePoller.prototype.stop = function() {
  clearTimeout(this.timeoutId);
  this.emit('stopped', 'i am done');
}
