import React from "react";

const comps = {
  header: require('../components/Header'),
  logo: require('../components/Logo'),
  infoLabel: require('../components/InfoLabel'),
  search: require('../components/Search'),
  title: require('../components/Title'),
  singleMetric: require('../components/SingleMetric')
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
