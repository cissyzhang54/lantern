import {expect} from 'chai';
import FeatureFlag from '../../src/shared/utils/featureFlag';

describe ('Feature Flag utils', function() {
  it ('Should identify whether the feature is active', function() {
    expect(FeatureFlag.check('testIdentifierOn')).to.equal(true);
    expect(FeatureFlag.check('testIdentifierOff')).to.equal(false);
    expect(FeatureFlag.check('keyThatDoesNotExistInConfig')).to.equal(false);
  });
});
