import React from "react";
import Link from 'react-router/lib/components/Link';
import FeatureFlag from '../utils/featureFlag';

export default class RecentArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    let renderFeature = FeatureFlag.check(this.props.identifier);
    this.render = renderFeature ? this.render : function () { return false };
  }

  render() {
    return ( <div data-component='recentArticles'>
      <h2><span className="small">Recent Articles</span></h2>
      <div><Link to="/articles/0049a468-4be5-11e5-b558-8a9722977189">Private equity secondaries evolve with Palamon deal</Link></div>
      <div><Link to="/articles/200bcb86-4bb9-11e5-9b5d-89a026fda5c9">Uber: Chinese traffic jam</Link></div>
      <div><Link to="/articles/34a35722-71ec-11e5-ad6d-f4ed76f0900a/section/Pink%20Snow:%20Ski%20Special">`Skiing gear guide` vs `Pink Snow` section</Link></div>
      <div><Link to="/articles/8966bd12-73b3-11e5-a129-3fcc4f641d98/global/FT">`China 3rd Quarter GDP` vs `FT`</Link></div>
    </div> );
  }
}
