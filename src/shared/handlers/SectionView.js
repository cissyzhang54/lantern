import React from 'react/addons';
import Header from '../components/Header';
import SectionModifier from '../components/SectionModifier';

import moment from 'moment'

export default class SectionView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let data = {
      topics:[],
      sections:[],
      genre:[],
      author: [],
      uuid: 'fake-uuid'
    };
    let comparatorData = {
      comparator: '',
      comparatorType: 'section'
    };
    let comparatorQuery = {
      dateTo: moment(),
      dateFrom:  moment().subtract(29,'days')
    }

    return(<div>

      <SectionModifier
        data={data}
        comparatorData={comparatorData}
        renderDevice={true}
        renderRegion={true}
        renderReferrers={true}
        renderUserCohort={true}
        query={comparatorQuery}
        uuid={data.uuid}
        />

      <Header
        title={'Section: ' + this.props.params.section}
        />

    </div>)
  }
}
