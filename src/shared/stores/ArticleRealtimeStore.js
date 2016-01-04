import alt from '../alt';
import io from 'socket.io-client';
import ArticleRealtimeActions from '../actions/ArticleRealtimeActions';
import ArticleRealtimeSource from '../sources/ArticleRealtimeSource';

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
      realtimeScrollDepth: [],
      realtimeTimeOnPage: [],
      timeOnPage: null,
      scrollDepth: null,
      livePageViews: null,
      totalPageViews: null,
      realtimeNextInternalUrl: [],
      linksClicked: null,
      retentionRate: 0,
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
    if (this.socket) {
      return;
    }

    this.socket = io();
    this.socket.connect();
    this.socket.on('connect', () => {
      this.setState({ isLive: true });
    });
    this.socket.on('disconnect', () => {
      this.setState({ isLive: false });
    });
    this.socket.on('reconnect', () => {
      this.setState({ isLive: true });
    });
    this.socket.on('updatedArticleData', (data) => {
      this.setState({
        pageViews: data.realtimePageViews,
        realtimeTimeOnPage: data.realtimeTimeOnPage,
        realtimeScrollDepth: data.realtimeScrollDepth,
        totalPageViews: sumAll(data.realtimePageViews),
        timeOnPage: data.timeOnPageLastHour,
        scrollDepth: data.scrollDepthLastHour,
        livePageViews: data.livePageViews,
        realtimeNextInternalUrl: data.realtimeNextInternalUrl,
        linksClicked: data.linksClickedLastHour,
        retentionRate: (data.retentionRate / sumAll(data.realtimePageViews)) * 100 | 0,
        isLive: true
      })

      this.setIsLiveTimer();
    });
    this.socket.on('error', (error) => {
      console.error(error);
    })
    this.socket.emit('subscribeToArticle', this.state.uuid);
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
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
    // must be wrapped in a timeout to trigger the source action
    setTimeout(() => {
      this.getInstance().loadArticleRealtimeData({uuid : uuid});
      this.setState({ uuid: uuid });

      if (!this.getInstance().isLoading()) {
        // Data not being fetched from server, go ahead and listen to web socket
        this.connect();
      }
    }, 0);
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
      totalPageViews: sumAll(data.realtimePageViews),
      linksClicked: data.linksClickedLastHour,
      retentionRate: (data.retentionRate / sumAll(data.realtimePageViews)) * 100 | 0,
      lastUpdated: data.realtimePageViews.length ? data.realtimePageViews.slice(-1)[0][0] : null
    });

    this.connect();
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

function sumAll(data) {
  let sum = 0;
  data.forEach((d) => {sum += d[1]});
  return sum;
}

export default alt.createStore(ArticleRealtimeStore, 'ArticleRealtimeStore');
