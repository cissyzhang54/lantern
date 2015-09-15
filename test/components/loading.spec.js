import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import Loading from '../../src/shared/components/Loading';

describe ('Loading component', function() {
  let loading;

  beforeEach(function() {
    loading = createComponent(Loading, {

    });
  });

  it ('Should render component', function() {
    const props = loading.props;
    const lantern = props.children[0]

    expect(lantern.type).to.equal('div');
    expect(lantern.props.children.length).to.equal(7);
  });
});
