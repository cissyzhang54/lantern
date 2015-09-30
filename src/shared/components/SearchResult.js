import React from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Link from 'react-router/lib/components/Link';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';

export default class SearchItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const result = this.props.result;
    const authors = formatAuthors(result.authors);
    const publishedDate = formatDate(result.initial_publish_date);
    return (
      <Link
        to={'/articles/' + result.article_uuid}
        key={result._id}
        >
        <ListGroupItem header={result.title}>
          <Row>
            <Col
              xs="6"
              style={{
                color: '#999'
              }}
              >
              {authors}
            </Col>
            <Col
              xs="6"
              style={{
                textAlign: 'right',
                color: '#999'
              }}
              >
              {'Published: ' + publishedDate}
            </Col>
          </Row>
          </ListGroupItem>
      </Link>
    );
  }
}

function formatAuthors(authors) {
  if (!authors.length) {
    return 'Unknown author';
  }
  // copy the array so we don't mess
  // with the original
  authors = authors.slice();
  let lastAuthor = authors.pop();
  if (!authors.length) {
    return lastAuthor;
  }
  return authors.join(", ") + ' and ' + lastAuthor;
}

function formatDate(date) {
  let m = moment(date);
  return m.fromNow();
}
