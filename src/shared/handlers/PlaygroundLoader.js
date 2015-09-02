import React from "react";

const comps = {
  header: require('../components/Header'),
  logo: require('../components/Logo'),
  search: require('../components/Search'),
  singleMetric: require('../components/SingleMetric'),
  infoLabel: require('../components/InfoLabel'),
  modifier: require('../components/Modifier'),
  lineChart: require('../components/LineChart')
};

export default class PlaygroundLoader extends React.Component {

  render() {
    let componentName = this.props.params.componentName;
    let Component = comps[componentName];

    if (!Component) {
      return (<div>Component not found</div>);
    }

    return React.createElement(Component);

  }


}
