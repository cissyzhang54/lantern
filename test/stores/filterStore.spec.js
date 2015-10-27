import {getKeys} from '../../src/shared/stores/FilterStore.js';
import {expect} from 'chai';


describe('getKeys', () => {
  var data = [
    ['windows', 10],
    ['linux', 0],
    ['macos', 10]
  ];

  it('should filter out properly values with zero', () => {
    var filtered = getKeys(data);
    expect(filtered).to.deep.equal(['windows', 'macos']);
  });
});
