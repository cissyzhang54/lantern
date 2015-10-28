import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
import SingleMetric from '../../src/shared/components/SingleMetric';

describe ('SingleMetric component', function() {

  beforeEach(function() {
  });

  it ('Should render integer variant', () => {
    let singleMetricInteger = createComponent(SingleMetric, {
      metric: 20000,
      comparatorMetric: 10000,
      metricType: 'integer',
      label: 'I am a single metric'
    });
    const intProps = singleMetricInteger.props;
    const intMetric = intProps.children[0];
    const intCommparator = intMetric.props.children[2].props.children;
    const intTitle = intProps.children[1];

    expect(intProps.className).to.equal('singleMetric');
    expect(intMetric.type).to.equal('p');

    expect(intTitle.type).to.equal('h3');
    expect(intTitle.props.children).to.equal('I am a single metric');

    expect(intMetric.props.children[0]).to.equal('20,000');
    expect(intCommparator[0].props.glyph).to.equal('glyphicon glyphicon-chevron-up');
    expect(intCommparator[1].props.children).to.equal('100%');
  });

  it ('Should render time variant', () => {
    let singleMetricTime = createComponent(SingleMetric, {
      metric: 340,
      comparatorMetric: 360,
      metricType: 'time',
    });
    const timeProps = singleMetricTime.props;
    const timeMetric = timeProps.children[0];
    const timeCommparator = timeMetric.props.children[2].props.children;

    expect(timeMetric.props.children[0]).to.equal('5m 40s');
    expect(timeCommparator[1].props.children).to.equal('5%');
  });

  it ('Should render properly when metric is zero but comparator is greater', () => {
    let zeroComp = createComponent(SingleMetric, {
      metric: 0,
      comparatorMetric: 443,
      metricType: 'integer',
      label: 'Page Views'
    });

    const props = zeroComp.props;
    const metric = props.children[0];
    const comparator = metric.props.children[2].props.children;

    expect(metric.props.children[0]).to.equal('0');
    expect(comparator[1].props.children).to.equal('100%')
  });

});
