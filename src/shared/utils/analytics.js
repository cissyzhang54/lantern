import pageDepth from './pageDepth';
import config from '../config/index';
import ga from 'react-google-analytics';

class Analytics {
  constructor () {
    this.trackingGifURL = 'http://track.ft.com/track/track.gif?';
    this.appname = 'lantern';

    if (document.domain === 'localhost' || typeof(ga) == 'undefined') {
      this.track = false;
      return;
    }

    this.track = true;
    this.attached = false;

    ga('create', config.gaTrackingID, 'auto');
  }

  sendGAEvent(event) {
    if (!this.track) return;
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
