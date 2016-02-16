import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import assign from 'object-assign';
import alt from '../alt';

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

  updateQuery(props) {
    switch (props.route.analyticsView) {
      case VIEW_TYPE_ARTICLE:
        AnalyticsActions.updateQuery({
          uuid : decode(props.params.uuid),
          type: 'article',
          comparatorType: decode(props.params.comparatorType),
          comparator: decode(props.params.comparator)
        });
        break;
      case VIEW_TYPE_SECTION:
        AnalyticsActions.updateQuery({
          section: decode(props.params.section),
          type: 'section',
          comparator: decode(props.params.comparator),
          comparatorType: decode(props.params.comparatorType)
        });
        break;
      case VIEW_TYPE_TOPIC:
        AnalyticsActions.updateQuery({
          topic: decode(props.params.topic),
          type: 'topic',
          comparator: decode(props.params.comparator),
          comparatorType: decode(props.params.comparatorType)
        });
        break;
    }

  }

  componentWillMount() {
    if (this.props.error) return; // in an error case, there's no valid query
    this.updateQuery(this.props);
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
    if (this.props.route.analyticsView !== newProps.route.analyticsView) {
      alt.recycle(AnalyticsStore);
      this.updateQuery(newProps);
    }
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
    analytics.trackScroll();
  }

  componentWillUnmount() {
    AnalyticsActions.destroy();
    alt.recycle(AnalyticsStore);
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
