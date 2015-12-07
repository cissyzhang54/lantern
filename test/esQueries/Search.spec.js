import { expect } from 'chai';
import SearchQuery from '../../src/server/esQueries/Search';

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
  describe('Advanced esQueries', () => {
    it('should handle title-only esQueries', () => {
      let query = SearchQuery({term:'title:"my tailor is rich"'});
      expect(query.query.bool.should.length).to.equal(2);
      expect(query.query.bool.should[0]).to.deep.equal({
        match : {
          title: "my tailor is rich"
        }
      });
      expect(query.query.bool.should[1]).to.deep.equal({
        match_phrase: {
          title: "my tailor is rich"
        }
      });
    });
    it('should handle author-only esQueries', () => {
      let query = SearchQuery({term: 'author:"Oneotrix Point Never"'});
      expect(query.query.bool.should.length).to.equal(1);
      expect(query.query.bool.should[0]).to.deep.equal({
        match_phrase: {
          authors: "Oneotrix Point Never"
        }
      });
    });
    it('should handle section-only esQueries', () => {
      let query = SearchQuery({term: 'section:"Companies and Technology"'});
      expect(query.query.bool.should.length).to.equal(1);
      expect(query.query.bool.should[0]).to.deep.equal({
        match_phrase: {
          sections: "Companies and Technology"
        }
      });
    });
  });
});
