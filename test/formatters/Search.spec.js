import { expect } from 'chai';
import SearchFormat from '../../src/server/formatters/Search';
import ESSearchResults from '../fixtures/data/search_results';


describe('Search Formatter', function () {
  it('should be a function', function () {
    expect(SearchFormat).to.be.a.function;
  });
  it('should return a promise', function () {
    let p = SearchFormat();
    expect(p.then).to.be.a.function;
    p = SearchFormat(null);
    expect(p.then).to.be.a.function;
    p = SearchFormat(undefined);
    expect(p.then).to.be.a.function
    p = SearchFormat(123);
    expect(p.then).to.be.a.function
    p = SearchFormat('123');
    expect(p.then).to.be.a.function
    p = SearchFormat([]);
    expect(p.then).to.be.a.function
    p = SearchFormat({});
    expect(p.then).to.be.a.function
  });
  it('should return a promise when called with an empty array', function (done) {
    SearchFormat([])
      .then((data) => {
        expect(data).to.be.a.array;
        expect(data.length).to.equal(0);
        done();
      });
  });
  it('should process search results correctly', function (done) {
    SearchFormat(ESSearchResults.hits.hits)
      .then((data) => {
        expect(data).to.be.a.array;
        expect(data.length).to.equal(10);
        done();
      });
  });
  it('should reject with an error if parsing fails', function (done) {
    SearchFormat(['asdfasdf'])
      .catch((error) => {
        expect(error.name).to.equal('DataParsingError');
        done();
      });
  });
  it('should reject with an error if given wrong args', function (done) {
    SearchFormat('wrong!')
      .catch((error) => {
        expect(error.name).to.equal('MalformedArgumentsError');
        done();
      });
  });
});
