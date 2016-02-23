import EventEmitter from 'events';
import util from 'util';
import {runSectionRealtimeQuery} from './esClient.js';
import SectionRealtimeDataFormatter from './formatters/SectionRealtimeDataFormatter.js';

export default function SectionPoller(query) {
  this.section = query.section;
  this.timespan = query.timespan;
  // XXX make this like configurable and stuff ;_;
  this.interval = 5000;
  if (this.timespan !== '1h') {
    this.interval = 60 * 1000;
  }
  EventEmitter.call(this);
  // then we immediately getSectionData which triggers
  // the polling
  this.getSectionData();
}

util.inherits(SectionPoller, EventEmitter);

// Polls for an article data and emits an event with
// the updated data
SectionPoller.prototype.getSectionData = function() {
  const query = {
    timespan: this.timespan,
    section: this.section
  }

  runSectionRealtimeQuery(query)
  .then(SectionRealtimeDataFormatter)
  .then(results => {
    this.emit('updatedData', results);
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
// requests section data.
SectionPoller.prototype.waitAndPoll = function() {
  this.timeoutId = setTimeout(this.getSectionData.bind(this), this.interval)
}

// Stop
SectionPoller.prototype.stop = function() {
  clearTimeout(this.timeoutId);
  this.emit('stopped', 'i am done');
}

