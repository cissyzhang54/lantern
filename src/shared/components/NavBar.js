import React from "react";
import Link from 'react-router/lib/Link';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import LogoSVG from '../components/LogoSVG';

import Text from './Text';

const styles = {
  alpha:{
    lineHeight: '3em',
    padding : '0 15px',
    display: 'block',
    fontWeight: 800,
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
    color: 'red',
    cursor: 'pointer'
  },
  infoIcon : {
    cursor:'pointer'
  }
};

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let navItems = [];
    let numrows = navItems.length;
    let rows = [];
    let i = 0;

    rows.push(
      <li className='pull-right' key={i++}>
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover title="What is alpha?" id="alpha-description">
              <Text message='explanations.navBar.alpha' />
            </Popover>
            }
          >
          <div style={styles.alpha} aria-describedby="alpha-description">
            ALPHA <Glyphicon style={styles.infoIcon} glyph="question-sign" />
          </div>
        </OverlayTrigger>
      </li>
    );

    return (
        <nav className="clearfix navbar" data-component='navBar'>
          <ul className="navbar__list">
            <li className="navbar__item" key={i++} >
              <LogoSVG />
            </li>
            {rows}
          </ul>
        </nav>
    );
  }
}
