import React from "react";
import DocumentTitle from 'react-document-title';
import UserStore from '../stores/UserStore'
import AltContainer from 'alt/AltContainer';
import NavBar from '../components/NavBar';
import User from '../components/User';

export default class AppController extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<DocumentTitle title='Lantern'>
      <AltContainer store={UserStore} >
        <User />
        <NavBar />
        {this.props.children}
      </AltContainer>
    </DocumentTitle>);
  }
}
