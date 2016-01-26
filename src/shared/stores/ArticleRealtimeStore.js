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
      realtimeRetention : [],
      internalReferrerLastHourTypes : [],
      internalReferrerLastHourUrls : [],
      externalReferrerLastHourTypes : [],
      externalReferrerLastHourNames : [],
      externalReferrerLastHourUrls : [],
      timeOnPage: null,
      scrollDepth: null,
      totalPageViews: null,
      realtimeNextInternalUrl: [],
      linksClicked: null,
      realtimeLinksClickedByCategory: [],
      retentionRate: 0,
      socialShares: null,
      socialReferrersLastHour: [],
      comments: null,
      commentsReadLastHour: null,
      userTypesLastHour: [],
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
      timespan: '1h'
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
          realtimeTimeOnPage: data.realtimeTimeOnPage,
          realtimeScrollDepth: data.realtimeScrollDepth,
          realtimeRetention: data.realtimeRetention,
          internalReferrerLastHourTypes : data.internalReferrerLastHourTypes,
          internalReferrerLastHourUrls : data.internalReferrerLastHourUrls,
          externalReferrerLastHourTypes : data.referrerLastHourTypes,
          externalReferrerLastHourNames : data.referrerLastHourNames,
          externalReferrerLastHourUrls : data.referrerLastHourUrls,
          totalPageViews: sumAll(data.realtimePageViews),
          timeOnPage: data.timeOnPageLastHour,
          scrollDepth: data.scrollDepthLastHour,
          realtimeNextInternalUrl: data.realtimeNextInternalUrl,
          realtimeLinksClickedByCategory: data.realtimeLinksClickedByCategory,
          retentionRate: (data.retentionRate / sumAll(data.realtimePageViews)) * 100 | 0,
          socialShares: data.socialSharesLastHour,
          socialReferrersLastHour: data.socialReferrersLastHour,
          comments: data.commentsLastHour,
          commentsReadLastHour: data.commentsReadLastHour,
          userTypesLastHour: data.userTypesLastHour,
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

      // if (!this.getInstance().isLoading()) {
      //   // Data not being fetched from server, go ahead and listen to web socket
        this.connect();
      // }
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
      internalReferrerLastHourTypes: data.internalReferrerLastHourTypes,
      internalReferrerLastHourUrls: data.internalReferrerLastHourUrls,
      externalReferrerLastHourTypes : data.referrerLastHourTypes,
      externalReferrerLastHourNames : data.referrerLastHourNames,
      externalReferrerLastHourUrls : data.referrerLastHourUrls,
      totalPageViews: sumAll(data.realtimePageViews),
      linksClicked: data.linksClickedLastHour,
      realtimeLinksClickedByCategory: data.realtimeLinksClickedByCategory,
      retentionRate: (data.retentionRate / sumAll(data.realtimePageViews)) * 100 | 0,
      socialReferrersLastHour: data.socialReferrersLastHour,
      socialShares: data.socialSharesLastHour,
      comments: data.commentsLastHour,
      commentsReadLastHour: data.commentsReadLastHour,
      userTypesLastHour: data.userTypesLastHour,
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
