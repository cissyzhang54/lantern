import {expect} from 'chai';
import React from 'react';
import Header from '../../src/shared/components/Header';
import createComponent from '../createComponent';

describe ('Header', function() {
  let header;

  beforeEach(function() {
    header = createComponent(Header, {
      identifier: 'header',
      title: 'My component state test title',
      author: 'By: Chris Evans',
      published: 'Date: 25-Aug-2015',
      logoSrc:'http://pinsoftstudios.com/wp-content/uploads/2012/10/pie-chart-fi.jpg'
    });
  });

  it ('should render properly', function() {
    debugger;
  });
});
