import {expect} from 'chai';
import FormatData from '../../src/shared/utils/formatData';
import ESArticleComparatorResults from '../fixtures/data/article_comparator_results';
import ESArticleResults from '../fixtures/data/article_results';

describe ('#formatData', function() {

  let dataFormatter;

  before(function() {
    dataFormatter = new FormatData(ESArticleResults, ESArticleComparatorResults);
  });

  it ('Should set up the constructor', function() {
    expect(dataFormatter.hasOwnProperty('DATA')).to.equal(true);
    expect(dataFormatter.hasOwnProperty('COMPARATORDATA')).to.equal(true);
    expect(dataFormatter.hasOwnProperty('id')).to.equal(true);
  });

});
