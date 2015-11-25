import React from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Link from 'react-router/lib/Link';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import * as formatAuthors from '../utils/formatAuthors';

export default class SearchItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const result = this.props.result;
    const authors = formatAuthors.join(result.authors);
    const sections = result.sections.map((section, i) => {
      return (
        <Link
          data-component='searchResult'
          to={'/sections/' + section}
          key={i}
          style={{
            marginRight: '3px',
            paddingRight: '3px',
            borderRight: '1px dashed #aaa'
          }}
          >
          {section}
        </Link>
      );
    });
    const publishedDate = formatDate(result.initial_publish_date);
    let linkUrl = '/articles/' + result.article_uuid;
    const publishedMoment = moment(result.initial_publish_date);
    const now = moment();
    const diff = now.diff(publishedMoment, 'hours');
    let clickHandler = this.props.handleClick;
    if (diff < 24) {
      linkUrl = '/realtime' + linkUrl;
      clickHandler = null;
    }
    return (
      <ListGroupItem header={(
        <Link
          data-component='searchResult'
          to={linkUrl}
          key={result._id}
          onClick={clickHandler}
          uuid={result.article_uuid}
          publishDate={result.initial_publish_date}
          >
          {result.title}
        </Link>)}
        >
        <Row style={{
            marginTop: '5px'
          }}>
          <Col
            xs={4}
            style={{
              color: '#999',
              fontSize: '12px'
            }}
            >
            {"Authors: " + authors}
          </Col>
          <Col
            xs={4}
            style={{
              color: '#F99',
              fontSize: '12px'
            }}
            >
            {"Sections: "}
            {sections}
          </Col>
          <Col
            xs={4}
            style={{
              textAlign: 'right',
              color: '#999'
            }}
            >
            {'Published: ' + publishedDate}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

function formatDate(date) {
  let m = moment(date);
  return m.fromNow();
}

