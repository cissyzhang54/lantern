import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import GlobalActions from '../actions/GlobalActions';
import GlobalStore from '../stores/GlobalStore';
import _ from 'underscore';
import moment from 'moment';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const warning_style = {
  color: "red"
}

const ok_style = {
  color: "#555"
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
    let updatedDate = moment(this.props.latestIndex.data.historical.latestIndex);
    let icon;
    let friendlyDate = this.props.latestIndex.data.historical.latestIndex
      .split('-')
      .reverse()
      .join('/');

    let outOfDate = (twentyFourHoursAgo > updatedDate);

    if(outOfDate) {
      return (<div className="last-updated">
        <div><Glyphicon glyph="exclamation-sign"
          style={warning_style}
        />
      &nbsp;Possibly out of date:</div>
    <div>data up to {friendlyDate}</div>
  </div>
      );
    } else {
      return (<div>
        <Glyphicon glyph="ok"
          style={ok_style}
        />
      &nbsp;Up to date
      </div>
      );
    }
  }
}

export default connectToStores(LastUpdated);
