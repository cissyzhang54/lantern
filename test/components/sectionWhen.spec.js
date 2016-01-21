import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import {createComponent} from '../createComponent';
import SectionWhen from '../../src/shared/components/SectionWhen';
import LineChart from '../../src/shared/components/LineChart';

import fixtureData from "../fixtures/data/readTimes";
import fixtureDataSincePublished from '../fixtures/data/readTimesSincePublish';
import fixtureComparator from "../fixtures/data/readTimesComparator"

describe ('sectionWhen component', function() {

  describe('Should render ', function(){

    it ('data', function() {
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data: {
          readTimes: fixtureData,
          readTimesSincePublish: fixtureDataSincePublished
        }
      });
      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props
      const metricLabel = 'Page Views'
      const comparatorLabel = '\'testComp\' Page Views'

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.data[0][metricLabel]).to.equal(38)
      expect(lineChart.data[0][comparatorLabel]).to.equal(undefined)
      expect(lineChart.data[0].category).to.equal('2015-09-07T00:00:000Z')
      expect(lineChart.keys.length).to.equal(1)
      expect(lineChart.keys[0]).to.equal(metricLabel)
    });

  })

  describe('matches data with comparators ', function(){

    it('when there is no data', function(){
      let section = createComponent(SectionWhen, {
        renderReadTimes : true,
        data: {
          readTimes : [],
          readTimesSincePublish : []
        },
        comparatorData: {
          comparator:'testComp',
          readTimes:fixtureComparator}
      });

      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props

      expect(lineChart.data.length).to.equal(0)
      expect(lineChart.keys.length).to.equal(1)
      expect(lineChart.keys[0]).to.equal('Page Views')
    })

    it('when there is no comparator data', function(){
      let section = createComponent(SectionWhen, {
        renderReadTimes:true,
        data: {
          readTimes: fixtureData,
          readTimesSincePublish: fixtureDataSincePublished
        },
        comparatorData: {}
      });

      const rows = section.props.children;
      const col = rows[1].props.children
      const lineChart = col.props.children.props

      expect(lineChart.data.length).to.equal(31)
      expect(lineChart.keys.length).to.equal(1)
      expect(lineChart.keys[0]).to.equal('Page Views')
    })


  });
});
