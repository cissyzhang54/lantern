/*

How To:
Step 1:
Have a responseStyles array which contains objects of styling and a mediaQuery.
 i.e.
 const responsiveStyles = [
     {   mediaQuery: 'default',
         title: {
            'text-align': 'center'
         },
     },
     {   mediaQuery: '(max-width: 550px)',
         title: {
            'font-size': '24px'
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
 let styles = this.state.responsiveStyle
 */
import React from 'react';
import assign from '../utils/ObjectAssignDeep';

function addListeners (component, responsiveStyles){
    let defaultStyle = {};
    let listeners = [];
    responsiveStyles.forEach(function(style){
        if (!style.mediaQuery || style.mediaQuery === 'default') return defaultStyle = style;
        let mq = window.matchMedia(style.mediaQuery);
        mq.addListener(mediaQueryChanged.bind(component, defaultStyle, style));
        listeners.push(mq);
        if (mq.matches) mediaQueryChanged.call(component, defaultStyle, style, {matches: true})
    });
    component.setState({listeners:listeners});
}

function removeListeners (component){
    component.state.listeners.forEach(function(listener){
        listener.removeListener(mediaQueryChanged);
    });
}

function mediaQueryChanged(defaultStyle, style, e) {
    let styles = e.matches ? assign({}, defaultStyle, style) : defaultStyle;
    this.setState({responsiveStyles: styles});
}

export default { addListeners, removeListeners, mediaQueryChanged }