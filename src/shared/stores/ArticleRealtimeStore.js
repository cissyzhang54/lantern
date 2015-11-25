import alt from '../alt';
import io from 'socket.io-client';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import ArticleRealtimeSource from '../sources/ArticleRealtimeSource';
import moment from 'moment';

const LIVE_TIMEOUT = 10000;

class ArticleRealtimeStore {

  constructor() {
    this.data = [];
    this.author = [];
    this.genre = [];
    this.title = "";
    this.topics = [];
    this.sections = [];
    this.published = "";
    this.published_human = "";
    this.errorMessage = null;
    this.loading = false;
    this.uuid = null;
    this.isLive = false;
    this.isLiveTimer = null;
    this.socket = null;
    this.bindActions(ArticleRealtimeActions);
    this.exportAsync(ArticleRealtimeSource);
  }

  connect() {
    if (!this.socket) {
      this.socket = io();
    }
    this.socket.connect();
    this.socket.on('connect', () => {
      this.isLive = true;
      this.emitChange();
    });
    this.socket.on('disconnect', () => {
      this.isLive = false;
      this.emitChange();
    });
    this.socket.on('reconnect', () => {
      this.isLive = true;
      this.emitChange();
    })
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
  }

  setIsLiveTimer() {
    clearTimeout(this.isLiveTimer);
    this.isLiveTimer = setTimeout(this.isLiveTimeout.bind(this), LIVE_TIMEOUT);
  }

  isLiveTimeout() {
    this.isLive = false;
    this.emitChange();
  }

  subscribeToArticle(uuid) {
    this.uuid = uuid;
    this.socket.on('updatedArticleData', (data) => {
      this.data = processData(this.data, data.realtimePageViews);
      this.isLive = true;
      this.emitChange();
      this.setIsLiveTimer();
    });
    this.socket.on('error', (error) => {
      console.error(error);
    })
    this.socket.emit('subscribeToArticle', uuid);
  }

  updateLastHour(data) {
    this.author = data.author;
    this.genre = data.genre;
    this.title = data.title;
    this.topics = data.topics;
    this.sections = data.sections;
    this.published = data.published;
    this.published_human = data.published_human;
    this.data = data.realtimePageViews;
  }

  loadingData() {
    this.loading = true;
  }

  loadingFailed(error) {
    this.loading = false;
    this.errorMessage = error.message;
  }

}

function processData(oldData, newData) {
  if (!oldData.length) {
    return newData;
  }
  if (!newData.length) {
    return oldData;
  }
  let last = oldData[oldData.length - 1];
  if (last[0] === newData[0][0]) {
    last[1] = newData[0][1]
    return oldData;
  }
  let data = oldData.concat(newData);
  const maxLen = (60);
  return data.slice(-maxLen);
}

export default alt.createStore(ArticleRealtimeStore, 'ArticleRealtimeStore');
