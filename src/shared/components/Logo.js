import React from 'react';
import { Link } from 'react-router';

var styles = {
    logo: {
        width: '200px',
        'verticalAlign': 'middle'
    }
};

export default class Logo extends React.Component {
    render() {
        return (
          <Link to="/">
            <img src={this.props.src} style={styles.logo}/>
          </Link>
        )
    }
}

Logo.defaultProps = {
  src: "http://placehold.it/300x150"
};
