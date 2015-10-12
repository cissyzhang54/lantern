import React from 'react/addons';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import LineChart from "../components/LineChart";

function getReaderComparator (data, comparatorData) {
  let compTimeData = comparatorData.readTimes;
  let articleTimeData = data.readTimes;
  let merged = [];
  let i;
  let compTime;
  let articleTime;

  if (compTimeData.length <= 0) return articleTimeData;

  for (i = 0; i<compTimeData.length; ++i) {
    compTime = moment(compTimeData[i].time);
    let flag = false;
    let j = 0;
    while (!flag && articleTimeData.length) {
      articleTime = moment(articleTimeData[j].time);
      if((compTime - articleTime) === 0) {
        let t = articleTimeData[j];
        t.comparator = compTimeData[i].comparator;
        merged.push(t);
        flag = true;
      } else if (j === articleTimeData.length - 1) {
        merged.push(articleTimeData[j]);
        flag = true;
      }
      j++;
    }
  }
  return merged;
}

export default class SectionWhen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.renderReadTimes){
      return (<div></div>)
    }

    let data = this.props.data;
    let comparatorData = this.props.comparatorData;
    let timeData = data.readTimes;
    let lineKeys = ['value'];

    if (comparatorData && comparatorData.readTimes) {
      lineKeys.push('comparator');
      timeData = getReaderComparator (data, comparatorData);
    }

    return (<div>
      <Row>
        <Col xs={12}>
          <h4>When did users access the article?</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <LineChart
            data={timeData}
            keys={lineKeys}
            yLabel='Page Views'
            xLabel='Time'
            cols={12}
            />
        </Col>
      </Row>
    </div>);
  }
}
