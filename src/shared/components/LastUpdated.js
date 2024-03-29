import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GlobalActions from '../actions/GlobalActions';
import GlobalStore from '../stores/GlobalStore';
import moment from 'moment';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const warning_style = {
  color: "red"
}


class LastUpdated extends React.Component {

  constructor(props) {
    super(props);
  }

  static getStores() {
    return [GlobalStore];
  }

  static getPropsFromStores() {
    return GlobalStore.getState();
  }

  componentDidMount() {
    GlobalActions.startIndexStatusPoll();
  }

  componentWillUnmount() {
    GlobalActions.stopIndexStatusPoll()
  }

  render() {
    let twentyFourHoursAgo = moment().subtract(24, 'hours');
    let fiveMinutesAgo = moment().subtract(5, 'minutes');

    let historicalUpdatedDate = moment(this.props.latestIndex.data.historical.latestEvent);
    let realtimeUpdatedDate = moment(this.props.latestIndex.data.realtime.docDate);

    let historicalFriendlyDate = moment.duration(historicalUpdatedDate.diff(moment())).humanize();
    let realtimeFriendlyDate = moment.duration(realtimeUpdatedDate.diff(moment())).humanize();

    let historicalOutOfDate = (twentyFourHoursAgo > historicalUpdatedDate);
    let realtimeOutOfDate = (fiveMinutesAgo > realtimeUpdatedDate);
    let message = '';

    if (realtimeOutOfDate && historicalOutOfDate) {
      message = 'Sorry, both live and archive views may be out of date. We\'re working on it.';
    }
    else if (realtimeOutOfDate) {
      message = `Sorry, the live views may only be up to date as of ${realtimeFriendlyDate} ago. We're working on it.`;
    }
    else if (historicalOutOfDate) {
      message = `Sorry, the archive views may only be up to date as of ${historicalFriendlyDate} ago. We're working on it.`;
    }
    else {
      // If nothing's out of date, don't render anything
      return false;
    }

    return (<div className="last-updated">
      <div className="last-updated__text">
        <Glyphicon glyph="exclamation-sign"
          style={warning_style}
        />
        &nbsp;{message}
      </div>
    </div>);
  }
}

export default connectToStores(LastUpdated);
