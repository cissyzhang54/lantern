import jsdom from 'jsdom';
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.window.matchMedia = () => {
  return {
    addListener: () => {},
    removeListener: () => {}
  }
};
global.navigator = {userAgent: 'node.js'};
