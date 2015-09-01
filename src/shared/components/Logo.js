import React from 'react';
import { Link } from 'react-router';

var styles = {
    logo: {
        width: '200px',
        'min-width': '75px',
        'verticalAlign': 'middle'
    },
    tagLine: {
        display: 'block'
    }
};

export default class Logo extends React.Component {
    render() {
        return (
          <Link to="/" >
            <img src='http://placehold.it/300x150' style={styles.logo}/>
            <small style={styles.tagLine}>Analytics for FT</small>
          </Link>
        )
    }
}

