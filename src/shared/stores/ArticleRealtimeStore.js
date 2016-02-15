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
      scrollDepth: [],
      timeOnPage: [],
      retention : [],
      internalReferrerArticles : 0,
      internalReferrerOther: 0,
      internalReferrerUrls : [],
      externalReferrerUrls : [],
      externalReferrerTypes : [],
      timeOnPageAvg: null,
      scrollDepthAvg: null,
      totalPageViews: null,
      totalPageViewsShifted: null,
      latestEvent: null,
      nextInternalUrl: [],
      linksClicked: null,
      linksClickedByCategory: [],
      retentionRate: 0,
      socialReferrers: [],
      comments: null,
      commentsRead: null,
      userTypes: [],
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
      socket: null,
      timespan: '1h',
      lastPublishDate: []
    }
  }

  connect() {
    if (this.socket) {
      this.socket.emit('unsubscribeFromArticle', this.state.previousArticle);
    }
    else {
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
          timeOnPage: data.realtimeTimeOnPage,
          scrollDepth: data.realtimeScrollDepth,
          retention: data.realtimeRetention,
          internalReferrerArticles : data.realtimeInternalReferrerArticles,
          internalReferrerOther : data.realtimeInternalReferrerOther,
          internalReferrerUrls : data.realtimeInternalReferrerUrls,
          externalReferrerNames : data.realtimeReferrerNames,
          externalReferrerUrls : data.realtimeReferrerUrls,
          externalReferrerTypes: data.realtimeReferrerTypes,
          totalPageViews: sumAll(data.realtimePageViews),
          totalPageViewsShifted: data.realtimePageViewsShifted,
          timeOnPageAvg: data.realtimeTimeOnPageAvg,
          scrollDepthAvg: data.realtimeScrollDepthAvg,
          latestEvent: data.realtimeLatestEvent,
          nextInternalUrl: data.realtimeNextInternalUrl,
          linksClickedByCategory: data.realtimeLinksClickedByCategory,
          linksClicked: data.realtimeLinksClicked,
          retentionRate: (data.retentionRate / data.realtimePageViewsShifted) * 100 | 0,
          socialReferrers: data.realtimeSocialReferrers,
          comments: data.realtimeComments,
          commentsRead: data.realtimeCommentsRead,
          userTypes: data.realtimeUserTypes,
          lastPublishDate: data.lastPublishDate,
          isLive: true
        })

        this.setIsLiveTimer();
      });
      this.socket.on('error', (error) => {
        console.error(error);
      });
    }

    this.socket.emit('subscribeToArticle', {
      uuid: this.state.uuid,
      timespan: this.state.timespan
    });
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

  subscribeToArticle(query) {
    // must be wrapped in a timeout to trigger the source action
    setTimeout(() => {
      this.getInstance().loadArticleRealtimeData(query);
      this.setState(query);
      this.connect();
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
      timeOnPage: data.realtimeTimeOnPage,
      timeOnPageAvg: data.realtimeTimeOnPageAvg,
      scrollDepth: data.realtimeScrollDepth,
      scrollDepthAvg: data.realtimeScrollDepthAvg,
      realtimeLatestEvent: data.realtimeLatestEvent,
      realtimeNextInternalUrl: data.realtimeNextInternalUrl,
      internalReferrerArticles: data.realtimeInternalReferrerArticles,
      internalReferrerOther: data.realtimeInternalReferrerOther,
      internalReferrerUrls: data.realtimeInternalReferrerUrls,
      externalReferrerTypes : data.realtimeReferrerTypes,
      externalReferrerNames : data.realtimeReferrerNames,
      externalReferrerUrls : data.realtimeReferrerUrls,
      totalPageViews: sumAll(data.realtimePageViews),
      totalPageViewsShifted: data.realtimePageViewsShifted,
      linksClicked: data.realtimeLinksClicked,
      realtimeLinksClickedByCategory: data.realtimeLinksClickedByCategory,
      retentionRate: (data.retentionRate / data.realtimePageViewsShifted) * 100 | 0,
      socialReferrers: data.realtimeSocialReferrers,
      comments: data.realtimeComments,
      commentsRead: data.realtimeCommentsRead,
      userTypes: data.realtimeUserTypes,
      lastPublishDate: data.lastPublishDate,
      lastUpdated: data.realtimePageViews.length ? data.realtimePageViews.slice(-1)[0][0] : null
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

function sumAll(data) {
  let sum = 0;
  data.forEach((d) => {sum += d[1]});
  return sum;
}

export default alt.createStore(ArticleRealtimeStore, 'ArticleRealtimeStore');
