import pageDepth from './pageDepth';
import config from '../config/index'

class Analytics {
  constructor () {
    this.trackingGifURL = 'http://track.ft.com/track/track.gif?';
    this.appname = 'lantern';

    if (document.domain === 'localhost') {
      this.track = false;
      return;
    }

    this.track = true;
    this.attached = false;

    ga('create', config.gaTrackingID, 'auto');
  }

  sendGAEvent(event) {
    if (!this.track) return;
    console.log('%c ----- GA Start -----', 'color:blue');
    console.log(event);
    console.log('%c ----- GA End -------', 'color:blue');
    ga('send', event); // e.g. pageview
  }

  sendSplunkEvent (container, eventType, eventValue) {
    if (!this.track) return;
    var trackingImage = document.createElement('img');
    trackingImage.src = this.trackingGifURL + this.appname + '_' + eventType + '=' + encodeURIComponent(eventValue);
    container.appendChild(trackingImage);
  }

  trackScroll () {
    // Allow the page to set up before initalising events
    setImmediate(function(){
      pageDepth.init();
    });

    // Send scroll event to GA
    if (!this.attached) {
      document.querySelector('#react-app').addEventListener('scrollDepth', function (e) {
        this.sendGAEvent({
          'hitType': 'event',
          'eventCategory': 'Page Scrolling',
          'eventAction': 'Scrolled ' + e.detail.scrollDepth + '%'
        });
      }.bind(this));
      this.attached = true;
    }
  }

} module.exports = new Analytics;