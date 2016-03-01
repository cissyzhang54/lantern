import React from "react";
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import LogoSVG from '../components/LogoSVG';
import Text from './Text';

const styles = {
  link:{
    lineHeight: '3em',
    padding : '0 15px',
    display: 'block'
  }
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="clearfix navbar" data-component='navBar'>
          <ul className="navbar__list">
            <li className="navbar__item">
              <LogoSVG />
            </li>
            <li className='pull-right'>
              <Link
                style={styles.link}
                to={'/'}>
                How-to guide
              </Link>
            </li>
          </ul>
        </nav>
    );
  }
}
