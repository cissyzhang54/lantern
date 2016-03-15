import React from 'react'
import assign from 'object-assign'
import {IntlProvider, FormattedMessage, FormattedHTMLMessage} from 'react-intl'
import ComponentStrings from '../strings/ComponentStrings'
import HandlerStrings from '../strings/HandlerStrings'
import ExplanationStrings from '../strings/ExplanationStrings'

var intlData = {
  locales: ['en-US'],
  messages: assign({}, ComponentStrings, HandlerStrings, ExplanationStrings)
};

// This older style of class was used to accomadate the React Intl Mixin
// When React Intl is updated for full ES6 this can be updated
var Text = React.createClass({

  propTypes : {
    type : React.PropTypes.oneOf(['text', 'html'])
  },

  getDefaultProps: function() {
    return {
      messages: intlData.messages,
      locales: intlData.locales,
      type : 'text',
      message : 'explanations.sectionHeadlineChart.articleViews'
    };
  },

  render: function () {
    return (
      <IntlProvider locale={this.props.locales[0]} messages={this.props.messages}>
        {
          this.props.type === 'html'
            ? <FormattedHTMLMessage id={this.props.message} values={this.props} />
            : <FormattedMessage id={this.props.message} values={this.props} />
        }
      </IntlProvider>
    );
  }
});

export default Text;
