/* How To:

Step 1:
 Have a responseStyles object which contains objects of styling named with a mediaQuery.
 i.e.
 const responsiveStyles = {
    'default': {
         img: 'banner-large.jpg,
     },
    '(max-width: 550px)': {
        img: 'banner-small.jpg,
         title: {
            'font-size': '10px'
         }
     }
 ];

Step 2:
 Add the listeners once the component has mounted
 i.e.

 componentDidMount() {
    responsiveStyleHandler.addListeners(this, responsiveStyles);
 }

Step 3:
 Don't forget to unmount those listeners
 i.e.

 componentWillUnmount() {
    responsiveStyleHandler.removeListeners(this);
 }

Step 4:
 Your styles are available on the state
 i.e.

 let styles = this.state.responsiveStyles
 */
import React from 'react';
import assign from '../utils/ObjectAssignDeep';

function addListeners (component, responsiveStyles){
    let defaultStyle = {};
    let listeners = [];
    Object.keys(responsiveStyles).forEach(function(key){
        let style = responsiveStyles[key];
        if (key === 'default') {
          defaultStyle = style;
          return style;
        }
        let mq = window.matchMedia(key);
        mq.addListener(mediaQueryChanged.bind(component, defaultStyle, style));
        listeners.push(mq);
        if (mq.matches) mediaQueryChanged.call(component, defaultStyle, style, {matches: true});
    });
    component.setState({listeners:listeners});
}

function removeListeners (component){
  if (!component.state.listeners) return;
  component.state.listeners.forEach(function(listener){
    listener.removeListener(mediaQueryChanged);
  });
}

function mediaQueryChanged(defaultStyle, style, e) {
    let styles = e.matches ? assign({}, defaultStyle, style) : defaultStyle;
    this.setState({responsiveStyles: styles});
}

export default { addListeners, removeListeners, mediaQueryChanged }
