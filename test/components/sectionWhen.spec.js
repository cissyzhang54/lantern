import {expect} from 'chai';
import React from 'react';
import createComponent from '../createComponent';
import SectionWhen from '../../src/shared/components/SectionWhen';
import LineChart from '../../src/shared/components/LineChart';

import fixtureData from "../fixtures/data/readTimes"
import fixtureComparator from "../fixtures/data/readTimesComparator"

const TestUtils = React.addons.TestUtils;

describe ('sectionWhen component', function() {

  describe('Should render ', function(){

    it ('data', function() {
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data:{readTimes:fixtureData}
      });
      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props
      const metricLabel = 'Value'
      const comparatorLabel = '\'testComp\' Average Value'

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.data[0][metricLabel]).to.equal(38)
      expect(lineChart.data[0][comparatorLabel]).to.equal(undefined)
      expect(lineChart.data[0].category).to.equal('2015-09-07T00:00:000Z')
      expect(lineChart.keys.length).to.equal(1)
      expect(lineChart.keys[0]).to.equal(metricLabel)
    });

    it ('comparator data', function() {
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data:{readTimes:fixtureData},
        comparatorData: {
          comparator:'testComp',
          readTimes:fixtureComparator}
      });
      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props
      const metricLabel = 'Value'
      const comparatorLabel = '\'testComp\' Average Value'

      expect(lineChart.data.length).to.equal(31)
      console.log(lineChart.data[0])
      expect(lineChart.data[0][metricLabel]).to.equal(38)
      expect(lineChart.data[0][comparatorLabel]).to.equal(7)
      expect(lineChart.data[0].category).to.equal('2015-09-07T00:00:000Z')
      expect(lineChart.data[2][metricLabel]).to.equal(51)
      expect(lineChart.data[2][comparatorLabel]).to.equal(16)
      expect(lineChart.data[2].category).to.equal('2015-09-09T00:00:000Z')
      expect(lineChart.keys.length).to.equal(2)
      expect(lineChart.keys[0]).to.equal(metricLabel)
      expect(lineChart.keys[1]).to.equal(comparatorLabel)
    });

  })

  describe('matches data with comparators ', function(){

    it('when there is no data', function(){
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data:{readTimes:[]},
        comparatorData: {
          comparator:'testComp',
          readTimes:fixtureComparator}
      });

      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.keys.length).to.equal(2)
      expect(lineChart.keys[0]).to.equal('Value')
      expect(lineChart.keys[1]).to.equal('\'testComp\' Average Value')
    })

    it('when there is no comparator data', function(){
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data:{readTimes:fixtureData},
        comparatorData: {}
      });

      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.keys.length).to.equal(1)
      expect(lineChart.keys[0]).to.equal('Value')
    })


  });
});
