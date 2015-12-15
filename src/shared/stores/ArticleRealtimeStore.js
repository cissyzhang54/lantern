import alt from '../alt';
import io from 'socket.io-client';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import ArticleRealtimeSource from '../sources/ArticleRealtimeSource';
import moment from 'moment';

const LIVE_TIMEOUT = 10000;

class ArticleRealtimeStore {

  constructor() {
    this.setDefaultState();
    this.bindActions(ArticleRealtimeActions);
    this.exportAsync(ArticleRealtimeSource);
  }

  setDefaultState() {
    this.state = {
      pageViews: [],
      timeOnPage: null,
      scrollDepth: null,
      livePageViews: null,
      totalPageViews: null,
      realtimeNextInternalUrl: [],
      author: [],
      genre: [],
      title: "",
      topics: [],
      sections: [],
      published: "",
      published_human: "",
      errorMessage: null,
      error: null,
      loading: false,
      uuid: null,
      isLive: false,
      isLiveTimer: null,
      socket: null
    }
  }



  connect() {
    if (!this.socket) {
      this.socket = io();
    }
    this.socket.connect();
    this.socket.on('connect', () => {
      this.setState({ isLive: true });
    });
    this.socket.on('disconnect', () => {
      this.setState({ isLive: false });
    });
    this.socket.on('reconnect', () => {
      this.setState({ isLive: true });
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
    this.socket.on('updatedArticleData', (data) => {
      this.setState({
        pageViews: processData(this.state.pageViews, data.realtimePageViews),
        totalPageViews: sumAll(this.state.pageViews),
        timeOnPage: data.timeOnPageLastHour,
        scrollDepth: data.scrollDepthLastHour,
        livePageViews: data.livePageViews,
        realtimeNextInternalUrl: data.realtimeNextInternalUrl,
        isLive: true,
        uuid: uuid
      })

      this.setIsLiveTimer();
    });
    this.socket.on('error', (error) => {
      console.error(error);
    })
    this.socket.emit('subscribeToArticle', uuid);
  }

  updateLastHour(data) {
    this.setState({
      author: data.author,
      genre: data.genre,
      title: data.title,
      topics: data.topics,
      sections: data.sections,
      published: data.published,
      published_human: data.published_human,
      pageViews: data.realtimePageViews,
      timeOnPage: data.timeOnPageLastHour,
      scrollDepth: data.scrollDepthLastHour,
      realtimeNextInternalUrl: data.realtimeNextInternalUrl,
      livePageViews: data.livePageViews,
      totalPageViews: sumAll(data.realtimePageViews)
    });
  }

  loadingData() {
    this.setState({
      loading: true
    });
  }

  loadingFailed(error) {
    this.setState({
      loading: false,
      errorMessage: error.message,
      error: error
    });
  }

}

function processData(oldData, newData) {
  if (!oldData || !oldData.length) {
    return newData;
  }
  if (!newData.length) {
    return oldData;
  }
  let last = oldData[oldData.length - 1];
  let newest = newData[0];
  // last is an array with:
  // ['DATE STR', number]
  if (last[0] === newest[0]) {
    last[1] = newest[1]
    return oldData;
  }
  let data = oldData.concat(newData);
  const maxLen = (60);
  return data.slice(-maxLen);
}

function sumAll(data) {
  let sum = 0;
  data.forEach((d) => {sum += d[1]});
  return sum;
}

export default alt.createStore(ArticleRealtimeStore, 'ArticleRealtimeStore');
