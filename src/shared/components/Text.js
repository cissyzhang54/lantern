import React from 'react'
import Intl from 'intl'
import {IntlMixin, FormattedMessage, FormattedHTMLMessage, FormattedRelative} from 'react-intl'
import ComponentStrings from '../strings/ComponentStrings'
import HandlerStrings from '../strings/HandlerStrings'
import ExplanationStrings from '../strings/ExplanationStrings'

var intlData = {
  locales : ['en-US'],
  messages: {
    components : ComponentStrings,
    handlers : HandlerStrings,
    explanations: ExplanationStrings
  }
};

// This older style of class was used to accomadate the React Intl Mixin
// When React Intl is updated for full ES6 this can be updated
var Text = React.createClass({
  mixins: [IntlMixin],

  propTypes : {
    type : React.PropTypes.oneOf(['text', 'html'])
  },

  getDefaultProps: function() {
    return {
      type: 'text'
    };
  },

  render: function () {
    this.props.messages = intlData.messages;
    this.props.locales = intlData.locales;
    let text;

    // Adding a switch for html - FormattedMessage is default as it renders faster
    if (this.props.type === 'html') {
      text = <FormattedHTMLMessage
        {...this.props}
        message={this.getIntlMessage(this.props.message)}
        />;
    } else {
      text = <FormattedMessage
        {...this.props}
        message={this.getIntlMessage(this.props.message)}
        />;
    }

    return (
      <span>{text}</span>
    );
  }
});

export default Text;
