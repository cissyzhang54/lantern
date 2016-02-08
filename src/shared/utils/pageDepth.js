let attached = false;
let scrollTimeout;
let mockedWindowHeight;
const percentageIncrements = [25, 50, 75, 100];

// Debounce the scroll bar
function scrollThrottler(delay, callback) {
  if ( !scrollTimeout ) {
    scrollTimeout = setTimeout(function() {
      scrollTimeout = null;
      callback();
    }, delay);
  }
}

// Get overall percentage of the page that has been scrolled
function getPercentageScrolled() {
  let content = document.querySelector('#react-app');
  let windowHeight = mockedWindowHeight || window.innerHeight;
  return (100 / content.getBoundingClientRect().height) * (windowHeight - content.getBoundingClientRect().top);
}

// Get the percentage of the page displayed on page load
function documentSizeDisplayed () {
  let windowHeight = window.innerHeight;
  let body = document.body;
  let html = document.documentElement;
  let docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

  let x = windowHeight / docHeight;
  return x * 100;
}

// Fire a scroll event for the percentage of the page shown
function scrollEventHandler() {
  let percentage = getPercentageScrolled();

  // Filter out the percentage scroll increments that havent yet been reached
  let currentIncrements = percentageIncrements.filter(function (bucket) {
      return bucket <= percentage;
  });

  // Check if the event has been fired before
  currentIncrements.forEach(function (currentIncrement) {
    if (scrollDepth.percentagesViewed.indexOf(currentIncrement) === -1) {
      var event = new CustomEvent('scrollDepth', {detail : {'scrollDepth' : currentIncrement}});
      document.querySelector('#react-app').dispatchEvent(event);
      scrollDepth.percentagesViewed.push(currentIncrement);
    }
  });
}

var scrollDepth = {
  percentagesViewed: [],
  init: function () {
    this.percentagesViewed = [];
    scrollEventHandler();
    if(!attached) {
      window.addEventListener("scroll", function () {
        scrollThrottler(100, scrollEventHandler);
      }, false);
      attached = true;
    }
  }
}; module.exports = scrollDepth;
