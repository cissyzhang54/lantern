import {expect} from 'chai';
import React from 'react';
import {createComponent} from '../createComponent';
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

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.data[0].value).to.equal(38)
      expect(lineChart.data[0].comparator).to.equal(undefined)
      expect(lineChart.data[0].time).to.equal('2015-09-07T00:00:00.000Z')
      expect(lineChart.keys.length).to.equal(1)
      expect(lineChart.keys[0]).to.equal('value')
    });

    it ('comparator data', function() {
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data:{readTimes:fixtureData},
        comparatorData: {readTimes:fixtureComparator}
      });
      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.data[0].value).to.equal(38)
      expect(lineChart.data[0].comparator).to.equal(8)
      expect(lineChart.data[0].time).to.equal('2015-09-07T00:00:00.000Z')
      expect(lineChart.data[2].value).to.equal(51)
      expect(lineChart.data[2].comparator).to.equal(12)
      expect(lineChart.data[2].time).to.equal('2015-09-09T00:00:00.000Z')
      expect(lineChart.keys.length).to.equal(2)
      expect(lineChart.keys[0]).to.equal('value')
      expect(lineChart.keys[1]).to.equal('comparator')
    });

  })

  describe('matches data with comparators ', function(){

    it('when there is no data', function(){
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data:{readTimes:[]},
        comparatorData: {readTimes:fixtureComparator}
      });

      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props

      expect(lineChart.data.length).to.equal(0)
      expect(lineChart.keys.length).to.equal(2)
      expect(lineChart.keys[0]).to.equal('value')
      expect(lineChart.keys[1]).to.equal('comparator')
    })


  });
});
