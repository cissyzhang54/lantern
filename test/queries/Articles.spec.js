import { expect } from 'chai';
import ArticlesQuery from '../../src/server/queries/Articles';

describe('Articles Query', () => {
  it('should be a function', () => {
    expect(ArticlesQuery).to.be.a.function;
  });
  it('should throw if passed no query object', () => {
    expect(() => ArticlesQuery()).to.throw;
  });
  it('should throw if passed no query uuid', () => {
    expect(() => ArticlesQuery({})).to.throw;
  });
  it('should throw if passed no dateFrom', () => {
    const query = {
      uuid: '123',
      dateTo: new Date().toISOString()
    };
    expect(() => ArticlesQuery(query)).to.throw;
  });
  it('should throw if passed no dateTo', () => {
    const query = {
      uuid: '123',
      dateFrom: new Date().toISOString()
    };
    expect(() => ArticlesQuery(query)).to.throw;
  });
});
