import {expect} from 'chai';
import React from 'react';
import {createComponent, createAltWrappedComponent} from '../createComponent';
import LastUpdated from '../../src/shared/components/LastUpdated';
import TestUtils from 'react-addons-test-utils';
import GlobalStore from '../../src/shared/stores/GlobalStore';
import GlobalActions from '../../src/shared/actions/GlobalActions';

import sinon from 'sinon';

describe('The LastUpdated component', function() {
  var fakeTimer;

  beforeEach(function() {
    fakeTimer = sinon.useFakeTimers(new Date(2016, 1, 5, 10).valueOf());
    sinon.stub(GlobalStore, 'getState').returns({ one: '1'});
    sinon.stub(GlobalActions, 'startIndexStatusPoll');
    sinon.stub(GlobalActions, 'stopIndexStatusPoll');
  });

  afterEach(function() {
    fakeTimer.restore();
    GlobalStore.getState.restore();
    GlobalActions.startIndexStatusPoll.restore();
    GlobalActions.stopIndexStatusPoll.restore();
  })

  it('renders nothing when data are up to date', function() {
    GlobalStore.getState.returns({
      latestIndex: {
        data: {
          historical: {
            latestIndex: '2016-02-05'
          },
          realtime: {
            docDate: '2016-02-05T10:00:00.000Z'
          }
        }
      }
    })

    let output = createAltWrappedComponent(LastUpdated);
    expect(output).to.equal(null);
  });

  it('renders a message for the historical indices being more than 24 hours out of date', function() {
    GlobalStore.getState.returns({
      latestIndex: {
        data: {
          historical: {
            latestIndex: '2016-02-01'
          },
          realtime: {
            docDate: '2016-02-05T10:00:00.000Z'
          }
        }
      }
    })

    let output = createAltWrappedComponent(LastUpdated);

    expect(output.props.children.props.children[2]).to.equal('Sorry, the historical views may only be up to date as of 4 days ago. We\'re working on it.');
  });

  it('renders a message for the realtime indices being more than an hour out of date', function() {
    GlobalStore.getState.returns({
      latestIndex: {
        data: {
          historical: {
            latestIndex: '2016-02-05'
          },
          realtime: {
            docDate: '2016-02-05T09:00:00.000Z'
          }
        }
      }
    })

    let output = createAltWrappedComponent(LastUpdated);

    expect(output.props.children.props.children[2]).to.equal('Sorry, the realtime views may only be up to date as of an hour ago. We\'re working on it.');
  });

  it('renders a message for both the historical and realtime indices being out of date', function() {
    GlobalStore.getState.returns({
      latestIndex: {
        data: {
          historical: {
            latestIndex: '2016-02-01'
          },
          realtime: {
            docDate: '2016-02-05T09:00:00.000Z'
          }
        }
      }
    })

    let output = createAltWrappedComponent(LastUpdated);

    expect(output.props.children.props.children[2]).to.equal('Sorry, both realtime and historical views may be out of date. We\'re working on it.');
  });


});
