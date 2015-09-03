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

  // Check the increment is in view and hasnt been scrolled past before load
  // Create increment bucket of the increments the screen currently displays
  let currentIncrements = percentageIncrements.filter(function (bucket) {
    if (bucket > getPercentageScrolled() - documentSizeDisplayed()) {
      return bucket <= percentage;
    }
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