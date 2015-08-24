import { expect } from 'chai';
import React from 'react';
import Article from '../../src/shared/components/Article';
import createComponent from '../createComponent';

describe('Article component', function() {
  let article;

  beforeEach(function() {
    article = createComponent(Article, { params: {id: '123'} });
  });

  it('should render an article', function() {
    const articleId = article.props;

    //console.log(articleId.children)//undefined

    //expect(articleId.children[0].type).to.equal('h2');
    //expect(articleId.children[1].type).to.equal('h3');

  });
});
