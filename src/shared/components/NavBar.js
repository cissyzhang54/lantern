import React from "react";
import { Link } from 'react-router';

import responsiveStyles from '../utils/responsiveStyles';
import Logo from '../components/Logo';

var controllerStyles = {
  'default': {
    nav: {
      backgroundColor: '#f8f8f8',
      border: '1px solid transparent',
      borderColor: '#e7e7e7',
      borderRadius: '4px',
      position: 'relative',
      marginBottom: '20px'
    },
    navbar: {
      paddingLeft:0,
      width: '100%',
      float: 'left',
      margin: 0
    },
    navitem:{
      float: 'left'
    },
    headerItem:{
      float: 'left',
      marginRight: '40px'
    },
    navlink:{
      lineHeight: '3em',
      padding : '0 15px',
      display: 'block'
    }
  },
  '(max-width: 500px)' : {
    nav: {
      fontSize: '12px'
    }
  }
};

export default class AppController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : controllerStyles['default']
    };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, controllerStyles);
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }

  render() {
    let styles = this.state.responsiveStyles;
    let navItems = [
      { title:'Seach', link:'/'},
      { title: 'ArticleList', link:'/articles'}
    ];
    let numrows = navItems.length;
    let rows = [];
    for (let i=0; i < numrows; i++) {
      rows.push(
          <li style={styles.navitem} key={i}>
            <Link to={navItems[i].link} style={styles.navlink}>{navItems[i].title}</Link>
          </li>);
    }
    return (
        <nav style={styles.nav} className="clearfix">
          <ul style={styles.navbar}>
            <li style={styles.headerItem}>
              <Logo />
            </li>
            {rows}
          </ul>
        </nav>
    );
  }
}
