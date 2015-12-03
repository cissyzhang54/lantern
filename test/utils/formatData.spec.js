import {expect} from 'chai';
import FormatData from '../../src/shared/utils/formatData';
import ESArticleComparatorResults from '../fixtures/data/article_comparator_results';
import ESArticleResults from '../fixtures/data/article_results';

describe ('#formatData', function() {

  let dataFormatter;

  before(function() {
    dataFormatter = new FormatData(ESArticleResults.aggregations, ESArticleComparatorResults.aggregations);
  });

  it ('Should set up the constructor', function() {
    expect(dataFormatter.hasOwnProperty('DATA')).to.equal(true);
    expect(dataFormatter.hasOwnProperty('COMPARATORDATA')).to.equal(true);
    expect(dataFormatter.hasOwnProperty('id')).to.equal(true);
  });

  it ('mapTypes', function(){
    expect(dataFormatter.mapTypes([ 'search', 60991 ])).to.deep.equal({ category: 'search', undefined: 60991 });
    expect(dataFormatter.mapTypes([ 'T', 60991 ], 'True', 'False')).to.deep.equal({ category: 'True', undefined: 60991 })
    expect(dataFormatter.mapTypes([ 'F', 60991 ], 'True', 'False')).to.deep.equal({ category: 'False', undefined: 60991 })
  })

  xit('merge', function(){

  })

  xit('getMetric', function(){

  })

  xit('getPCTMetric', function(){

  })

});
