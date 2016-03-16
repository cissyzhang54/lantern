import React from "react";

const comps = {
  barChart: require('../components/BarChart'),
  columnChart: require('../components/ColumnChart'),
  dateRange: require('../components/DateRange'),
  dualScaleLineChart: require('../components/DualScaleLineChart'),
  filter: require('../components/Filter'),
  filters: require('../components/Filters'),
  header: require('../components/Header'),
  lineChart: require('../components/LineChart'),
  liveIndicator: require('../components/LiveIndicator'),
  logo: require('../components/Logo'),
  logoSVG: require('../components/LogoSVG'),
  map: require('../components/Map'),
  messaging: require('../components/Messaging'),
  modifierDescription: require('../components/ModifierDescription'),
  navBar: require('../components/NavBar'),
  pieChart: require('../components/PieChart'),
  recentArticles: require('../components/RecentArticles'),
  search: require('../components/Search'),
  searchResult: require('../components/SearchResult'),
  singleMetric: require('../components/SingleMetric'),
  table: require('../components/Table'),
  tag: require('../components/Tag'),
  tags: require('../components/Tags'),
  text: require('../components/Text'),
  user: require('../components/User')
};

export default class PlaygroundLoader extends React.Component {
  render() {
    let componentName = this.props.params.componentName;
    let Component = comps[componentName];

    if (!Component) {
      return (<div>Component not found</div>);
    }

    return React.createElement(Component, {

    });
  }
}
