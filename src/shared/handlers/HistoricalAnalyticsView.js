import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import assign from 'object-assign';

import ArticleView from "./ArticleView";
import SectionView from "./SectionView";
import TopicView from "./TopicView";

const VIEW_TYPE_ARTICLE = 'article';
const VIEW_TYPE_SECTION = 'section';
const VIEW_TYPE_TOPIC = 'topic';

function decode(uri){
  return uri ? decodeURI(uri) : null
}

class HistoricalAnalyticsView extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AnalyticsStore];
  }

  static getPropsFromStores() {
    return AnalyticsStore.getState();
  }

  componentWillMount() {
    if (this.props.error) return; // in an error case, there's no valid query

    switch (this.props.route.analyticsView) {
      case VIEW_TYPE_ARTICLE:
        AnalyticsActions.updateQuery({
          uuid : decode(this.props.params.uuid),
          type: 'article',
          comparatorType: decode(this.props.params.comparatorType),
          comparator: decode(this.props.params.comparator)
        });
        break;
      case VIEW_TYPE_SECTION:
        AnalyticsActions.updateQuery({
          section: decode(this.props.params.section),
          type: 'section',
          comparator: decode(this.props.params.comparator),
          comparatorType: decode(this.props.params.comparatorType)
        });
        break;
      case VIEW_TYPE_TOPIC:
        AnalyticsActions.updateQuery({
          topic: decode(this.props.params.topic),
          type: 'topic',
          comparator: decode(this.props.params.comparator),
          comparatorType: decode(this.props.params.comparatorType)
        });
        break;
    }
  }

  componentWillReceiveProps(newProps) {
    // Update the query if the comparator changes
    if (this.props.params.comparator !== newProps.params.comparator
      || this.props.params.comparatorType !== newProps.params.comparatorType) {
        AnalyticsActions.updateQuery(assign(
          {},
          this.props.query,
          { comparator: newProps.params.comparator, comparatorType: newProps.params.comparatorType }
        ));
      }
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  componentWillUnmount() {
    AnalyticsActions.destroy();
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <ErrorHandler
          category="Article"
          type="ERROR"
          message={this.props.errorMessage}
          error={this.props.error}
        />
      );
    } else if (!this.props.data) {
      return (
        <Messaging
          category="Article"
          type="LOADING"
        />
      );
    }

    switch (this.props.route.analyticsView) {
      case VIEW_TYPE_ARTICLE:
        return (
          <ArticleView {...this.props} />
        );
      case VIEW_TYPE_SECTION:
        return (
          <SectionView {...this.props} />
        );
      case VIEW_TYPE_TOPIC:
        return (
          <TopicView {...this.props} />
        );
      default:
        return (
          <p>Unhandled view type</p>
        );
    }
  }
}

export default connectToStores(HistoricalAnalyticsView);
