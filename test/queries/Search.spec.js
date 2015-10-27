import { expect } from 'chai';
import SearchQuery from '../../src/server/queries/Search';

describe('Search Query', () => {
  it('should be a function', () => {
    expect(SearchQuery).to.be.a('function')
    expect(() => SearchQuery({term:'test'})).to.be.a('function');
    expect(() => SearchQuery({term:'test'})).not.to.throw();
  });
  it('should throw if passed no query string', () => {
    expect(() => SearchQuery()).to.throw();
  });
  it('should throw if passed something other than a object containing a term', () => {
    expect(() => SearchQuery({})).to.throw();
    expect(() => SearchQuery({notTerm:'doh'})).to.throw();
    expect(() => SearchQuery(1)).to.throw();
    expect(() => SearchQuery(false)).to.throw();
    expect(() => SearchQuery(null)).to.throw();
    expect(() => SearchQuery(undefined)).to.throw();
  });
});
