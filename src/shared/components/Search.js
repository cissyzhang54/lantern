import React from "react";
import Input from 'react-bootstrap/lib/Input';

import Logo from '../components/Logo';

export default class Search extends React.Component {

  componentDidMount() {
    this.refs.search.getInputDOMNode().focus();
  }

  render() {

    return (<div>
      <Logo iconOnly large/>
      <Input
          ref="search"
        labelClassName='large'
        bsSize='large'
        type='search'
        addonBefore='Search'
        >
      </Input>
    </div>);
  }

}
