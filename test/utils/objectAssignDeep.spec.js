import {expect} from 'chai';
import ObjectAssignDeep from '../../src/shared/utils/ObjectAssignDeep';

describe ('ObjectAssignDeep utils', function() {
  it ('Should merge the two objects together', function() {
    expect(ObjectAssignDeep()).to.deep.equal({});

    expect(ObjectAssignDeep({foo: 'foo'})).to.deep.equal({ foo: 'foo' });
    expect(ObjectAssignDeep({foo: 'foo'}, {})).to.deep.equal({ foo: 'foo' });
    expect(ObjectAssignDeep({foo: 'foo'}, {bar: 'bar'})).to.deep.equal({ foo: 'foo', bar: 'bar' });

    expect(ObjectAssignDeep({foo: 'foo'}, {bar: {test : 'test'}})).to.deep.equal({ foo: 'foo', bar: {test :'test'}});
    expect(ObjectAssignDeep({bar: {test : 'test'}}, {bar: {test : 'new value'}})).to.deep.equal({bar: {test : 'new value'}});
  });
});
