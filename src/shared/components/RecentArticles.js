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
    return ( <div>
      <h2><span className="small">Recent Articles</span></h2>
      <div><Link to="/articles/0049a468-4be5-11e5-b558-8a9722977189">Private equity secondaries evolve with Palamon deal</Link></div>
      <div><Link to="/articles/200bcb86-4bb9-11e5-9b5d-89a026fda5c9">Uber: Chinese traffic jam</Link></div>
    </div> );
  }
}
