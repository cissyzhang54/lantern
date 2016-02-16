import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import AnalyticsActions from '../actions/AnalyticsActions';
import AnalyticsStore from '../stores/AnalyticsStore';
import Messaging from '../components/Messaging';
import ErrorHandler from '../components/ErrorHandler';
import assign from 'object-assign';
import alt from '../alt';
import moment from 'moment'


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
          comparator: decode(props.params.comparator),
          timespan: decode(props.params.timespan)
        });
        break;
      case VIEW_TYPE_SECTION:
        AnalyticsActions.updateQuery({
          section: decode(props.params.section),
          type: 'section',
          comparator: decode(props.params.comparator),
          comparatorType: decode(props.params.comparatorType),
          timespan: decode(props.params.timespan)
        });
        break;
      case VIEW_TYPE_TOPIC:
        AnalyticsActions.updateQuery({
          topic: decode(props.params.topic),
          type: 'topic',
          comparator: decode(props.params.comparator),
          comparatorType: decode(props.params.comparatorType),
          timespan: decode(props.params.timespan)
        });
        break;
    }

  }

  hasQueryChanged(oldProps, newProps) {
    const changedComparator = oldProps.params.comparator !== newProps.params.comparator;
    const changedCompType = oldProps.params.comparatorType !== newProps.params.comparatorType;
    const changedTimestamp = oldProps.params.timespan !== newProps.params.timespan;
    const isCustomTimestamp = oldProps.params.timespan === 'custom';
    const hasCustomTimerangeChanged = (oldProps.dateFrom !== newProps.dateFrom) || (oldProps.dateTo !== newProps.dateTo);

    return changedComparator || changedCompType || changedTimestamp || (isCustomTimestamp && hasCustomTimerangeChanged);
  }


  componentWillReceiveProps(newProps) {
    // Update the query if the comparator changes
    if (this.hasQueryChanged(this.props, newProps)) {

        let dateFrom = moment(newProps.data.published).toISOString();
        let dateTo = moment().toISOString();
        let timespan = newProps.params.timespan;

        if (newProps.params.timespan === 'custom') {
          dateFrom = newProps.location.query.dateFrom;
          dateTo = newProps.location.query.dateTo;
        } else if (newProps.params.timespan && this.props.route.analyticsView === VIEW_TYPE_ARTICLE) {
          dateFrom = newProps.data.published;
          dateTo = moment(newProps.data.published).add(newProps.params.timespan, 'hours').toISOString();
        } else if (newProps.params.timespan && (this.props.route.analyticsView === VIEW_TYPE_SECTION || this.props.route.analyticsView === VIEW_TYPE_TOPIC)) {
          dateFrom = moment().subtract(newProps.params.timespan, 'hours').toISOString();
          dateTo = moment().toISOString();
        }


        AnalyticsActions.updateQuery(assign(
          {},
          this.props.query,
          { comparator: newProps.params.comparator,
            comparatorType: newProps.params.comparatorType,
            timespan: timespan,
            dateFrom: dateFrom,
            dateTo: dateTo
          }
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
    this.updateQuery(this.props);
  }

  componentWillUnmount() {
    AnalyticsActions.destroy();
    alt.recycle(AnalyticsStore);
  }

  handleDateRangeChange(e) {
    let params = this.props.params;
    let dateFrom = moment(e.startDate, 'milliseconds').toISOString();
    let dateTo = moment(e.endDate, 'milliseconds').toISOString();
    let comparatorPath;

    switch (this.props.route.analyticsView) {
      case VIEW_TYPE_ARTICLE:
        this.props.history.push(`/articles/${params.uuid}/custom/${params.comparatorType}/${params.comparator}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
        break;
      case VIEW_TYPE_SECTION:
        comparatorPath = (params.comparator) ? `/${params.comparatorType}/${params.comparator}` : '';
        this.props.history.push(`/sections/${params.section}/custom${comparatorPath}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
        break;
      case VIEW_TYPE_TOPIC:
        comparatorPath = (params.comparator) ? `/${params.comparatorType}/${params.comparator}` : '';
        this.props.history.push(`/topics/${params.topic}/custom${comparatorPath}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
        break;
    }
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
          <ArticleView {...this.props} onDateRangeChange={ this.handleDateRangeChange.bind(this) }/>
        );
      case VIEW_TYPE_SECTION:
        return (
          <SectionView {...this.props} onDateRangeChange={ this.handleDateRangeChange.bind(this) } />
        );
      case VIEW_TYPE_TOPIC:
        return (
          <TopicView {...this.props} onDateRangeChange={ this.handleDateRangeChange.bind(this) } />
        );
      default:
        return (
          <p>Unhandled view type</p>
        );
    }
  }
}

export default connectToStores(HistoricalAnalyticsView);
