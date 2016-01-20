import React from 'react';

export default class DefinitionList extends React.Component {

  render() {
      let items = this.props.items.map((item) => {
        let additionalTermClassNames = item.header? "metric-list__term--header" : "";
        let additionalValueClassNames = item.header? "metric-list__value--header" : "";
        return [<dt className={"metric-list__term " + additionalTermClassNames}>{item.term}</dt>,
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
