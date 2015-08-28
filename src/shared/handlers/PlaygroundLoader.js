import React from "react";

import Logo from '../components/Logo';
import InfoLabel from '../components/InfoLabel';
import Search from '../components/Search';
import Title from '../components/Title';


const comps = {
  header: require('../components/Header'),
  logo: Logo,
  infoLabel: InfoLabel,
  search: Search,
  title: Title
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
