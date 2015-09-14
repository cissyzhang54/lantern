import React from "react";
import Link from 'react-router/lib/components/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
    },
    alpha:{
      lineHeight: '3em',
      padding : '0 15px',
      display: 'block',
      fontWeight: 800,
      backgroundColor: 'rgba(255, 0, 0, 0.15)',
      color: 'red'
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
      //{ title:'Search', link:'/'}
    ];
    let numrows = navItems.length;
    let rows = [];
    let i = 0;
    for (i; i < numrows; i++) {
      rows.push(
          <li style={styles.navitem} key={i}>
            <Link to={navItems[i].link} style={styles.navlink}>{navItems[i].title}</Link>
          </li>);
    }

    rows.push(
      <li className='pull-right' key={i++}>
        <div style={styles.alpha}>ALPHA</div>
      </li>,
      <li className='pull-right' style={styles.navitem} key={i++}>
        <a href='/logout' style={styles.navlink}>
          <Glyphicon glyph={'log-out'} />
          Logout
        </a>
      </li>
    );

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
