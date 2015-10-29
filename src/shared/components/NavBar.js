import React from "react";
import Link from 'react-router/lib/components/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import responsiveStyles from '../utils/responsiveStyles';
import LogoSVG from '../components/LogoSVG';

var controllerStyles = {
  'default': {
    nav: {
      backgroundColor: '#f8f8f8',
      border: '1px solid transparent',
      borderColor: '#e7e7e7',
      borderRadius: '4px',
      position: 'relative',
      marginBottom: '0px'
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
      marginRight: '40px',
      width: '200px'
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
      color: 'red',
      cursor: 'pointer'
    }
  },
  '(max-width: 500px)' : {
    headerItem:{
      width: '50px'
    },
    nav: {
      fontSize: '12px'
    }
  }
};

export default class NavBar extends React.Component {
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
          <Link
            to={navItems[i].link}
            style={styles.navlink}
            >
            {navItems[i].title}
          </Link>
        </li>);
    }
    rows.push(
      <li className='pull-right' key={i++}>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover title="What is alpha?" id="alpha-description">
              Lantern is currently in an alpha state and is not a live system.
              The data used does not represent the live FT.com.
              There will be ongoing changes, without warning,
              to both the data and the interface,
              as development continues.
            </Popover>
            }
          >
          <div style={styles.alpha} aria-describedby="alpha-description">
            ALPHA <Glyphicon glyph="question-sign" />
          </div>
        </OverlayTrigger>
      </li>
    );
    rows.push(
      <li className='pull-right' key={i++} style={styles.navlink} >
        <div >Hi, {this.props.user.name.givenName}</div>
      </li>
    );

    return (
        <nav style={styles.nav} className="clearfix navBar" data-component='navBar'>
          <ul style={styles.navbar} className="navBar--list">
            <li style={styles.headerItem} key={i++} >
              <LogoSVG />
            </li>
            {rows}
          </ul>
        </nav>
    );
  }
}
