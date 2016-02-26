import pageDepth from './pageDepth';
import config from '../config/index';
import ga from 'react-ga';

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

    var options = { debug: true };
    ga.initialize(config.gaTrackingID, options)
  }

  sendGAPageViewEvent(event) {
    if (!this.track) return;
    ga.pageview(document.location.pathname + document.location.search)
  }

  sendGACustomEvent(json) {
    ga.event(json)
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
      let el = document.querySelector('#react-app');
      if (!el) return;
      el.addEventListener('scrollDepth', function (e) {
        this.sendGACustomEvent({
          'category': 'Scroll',
          'action': 'Page Scroll',
          'label': 'Scrolled: ' + e.detail.scrollDepth + '%',
          'value': e.detail.scrollDepth
        });
      }.bind(this));
      this.attached = true;
    }
  }

} module.exports = new Analytics;
