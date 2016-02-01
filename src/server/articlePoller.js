import EventEmitter from 'events';
import util from 'util';
import {runArticleRealtimeQuery} from './esClient.js';
import ArticleRealtimeDataFormatter from './formatters/ArticleRealtimeDataFormatter.js';

export default function ArticlePoller(uuid, timespan) {
  this.uuid = uuid;
  this.timespan = timespan;
  // XXX make this like configurable and stuff ;_;
  this.interval = 5000;
  if (this.timespan !== '1h') {
    this.interval = 60 * 1000;
  }
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
    timespan: this.timespan,
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
    error.originalError = err;
    this.emit('error', error);
  });
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
