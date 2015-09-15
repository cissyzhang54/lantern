import { expect } from 'chai';
import DataAPIUtils from '../../src/shared/utils/DataAPIUtils';

describe("Data Api Utils", () => {

  describe("#getArticleData()", () => {

    it('should throw an exception if no query object is passed', () => {
      expect(() => DataAPIUtils.getArticleData()).to.throw();
    });

    it('should throw an exception if no uuid is present in the query', () => {
      expect(() => DataAPIUtils.getArticleData({})).to.throw();
    });

    it('should throw an exception if the uuid passed to the query is not a string', () => {
      expect(() => DataAPIUtils.getArticleData({uuid:123})).to.throw();
    });


    it('should not throw an exception if the uuid passed to the query is a string', () => {
      expect(() => DataAPIUtils.getArticleData({uuid:'123'})).not.to.throw();
    });

  });

  describe('#search()', () => {

    it('should throw an exception if no query is passed', () => {
      expect(() => DataAPIUtils.search()).to.throw();
    });

    it('should throw an exception if a non string query is passed', () => {
      expect(() => DataAPIUtils.search(123)).to.throw();
      expect(() => DataAPIUtils.search({})).to.throw();
      expect(() => DataAPIUtils.search(false)).to.throw();
    });

    it('should not throw  if a string query is passed', () => {
      expect(() => DataAPIUtils.search('123')).not.to.throw();
    });

  });

});
