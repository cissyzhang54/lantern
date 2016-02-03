import React from 'react';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

export default class DefinitionList extends React.Component {

  render() {

    let items = this.props.items.map((item) => {

      let toolTip;
      if (item.toolTip) {
        let toolTipTitle = "item-description";
        toolTip = (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={toolTipTitle}>
                {item.toolTip}
              </Popover>
              }
          >
            <span>
              <Glyphicon
                glyph="question-sign"
                className="metric-list__infoIcon"
                aria-describedby={toolTipTitle}
              />
            </span>
          </OverlayTrigger>
        );
      };

      let additionalTermClassNames = item.header? "metric-list__term--header" : "";
      let additionalValueClassNames = item.header? "metric-list__value--header" : "";
      return [<dt className={"metric-list__term " + additionalTermClassNames}>{item.term}{toolTip}</dt>,
        <dd className={"metric-list__value " + additionalValueClassNames}>{item.value}</dd>
      ];
    });

    if (items.length === 0) {
      return (<div></div>);
    }

    return (
      <dl className="metric-list">
      {items}
      </dl>
    );
  }
}

DefinitionList.defaultProps = {
  items : []
};
