import React from "react";
import Text from '../components/Text'
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const styles = {

}

export default class ToolTip extends React.Component {
  render() {

    return (
      <div className="toolTip">
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          rootClose
          bsClass="toolTip"
          overlay={
            <Popover id={this.props.id}>
              <p><Text type={this.props.type} message={this.props.message} /></p>
            </Popover>
          }>
          <span>
            <Glyphicon
              glyph="question-sign"
              aria-describedby="chart-description"
              />
          </span>
        </OverlayTrigger>
      </div>
    );
  }
}
