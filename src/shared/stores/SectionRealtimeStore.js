import alt from '../alt';
import io from 'socket.io-client';
import SectionRealtimeActions from '../actions/SectionRealtimeActions';
import SectionRealtimeSource from '../sources/SectionRealtimeSource';
import Raven from 'raven-js';

const LIVE_TIMEOUT = 10000;

class SectionRealtimeStore {

  constructor() {
    this.setDefaultState();
    this.bindActions(SectionRealtimeActions);
    this.exportAsync(SectionRealtimeSource);
  }

  setDefaultState() {
    this.state = {
      topicsCovered : null,
      totalPageViews : null,
      articlesPublished : null,
      pageViews : [],
      articleList: [],
      section: null,
      timespan: '24h',
      live: false
    }
  }

  connect() {
    if (this.socket) {
      this.socket.emit('unsubscribeFromSection', this.state.previousSection);
    } else {
      this.socket = io();
      this.socket.on('connect', () => this.setState({isLive: true}));
      this.socket.on('disconnect', () => this.setState({isLive: false}));
      this.socket.on('reconnect', () => this.setState({isLive: true}));
      this.socket.on('updatedData', this.handleData.bind(this));
      this.socket.on('error', this.loadingFailed.bind(this));
      this.socket.connect();
    }

    this.socket.emit('subscribeToSection', {
      section: this.state.section,
      timespan: this.state.timespan
    });

  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }

  isLiveTimeout() {
    this.setState({live: false});
  }

  setIsLiveTimer(){
    clearTimeout(this.isLiveTimer);
    this.isLiveTimer = setTimeout(this.isLiveTimeout.bind(this), LIVE_TIMEOUT);
  }

  handleData(data) {
    const totalPageViews = data.realtimePageViews.reduce((prev, curr) => {return prev + curr[1]}, 0 );
    this.setState({
      topicsCovered: data.realtimeTopicsCovered,
      totalPageViews: totalPageViews,
      articlesPublished: data.realtimeArticlesPublished,
      pageViews: data.realtimePageViews,
      articleList: data.articleList,
      loading: false
    });
    this.setIsLiveTimer();
  }

  subscribeToSection(query) {
    setTimeout(() => {
      this.getInstance().loadSectionRealtimeData(query);
      this.setState(query);
      this.connect();
    }, 0)
  }

  loadingData() {
    this.setState({loading: true})
  }

  loadingFailed(error) {
    this.setState({
      loading: false,
      errorMessage: error.message,
      error: error
    })
    Raven.captureException(error, this.state);
  }
}

export default alt.createStore(SectionRealtimeStore, 'SectionRealtimeStore');
