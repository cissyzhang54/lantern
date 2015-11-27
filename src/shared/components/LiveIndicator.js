import React from 'react';

export default class LiveIndicator extends React.Component {

  render() {
    if (this.props.isLive) {
      return (
        <p className="live">
          <span className="live--pulsate">●</span> Live
        </p>
      )
    }
    else {
      return (
        <p className="live live--disconnected">
          <span>✖</span> Disconnected
        </p>
      )
    }
  }

}
