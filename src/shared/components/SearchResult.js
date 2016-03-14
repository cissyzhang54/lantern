import React from 'react';
import Link from 'react-router/lib/Link';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import moment from 'moment';
import responsiveStyles from '../utils/responsiveStyles';
import * as formatAuthors from '../utils/formatAuthors';

var controllerStyles = {
  'default': {
    row : {
      marginTop: '5px'
    },
    link :{
      marginRight: '3px',
      paddingRight: '3px',
      borderRight: '1px dashed #aaa'
    },
    authors : {
      color: '#999',
      fontSize: '12px',
      display: 'block',
      marginBottom: '5px'
    },
    sections : {
      color: '#F99',
      fontSize: '12px',
      display: 'block'
    },
    date : {
      textAlign: 'right',
      color: '#999',
      display: 'block'
    }
  }
};

export default class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : controllerStyles['default']
    };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, controllerStyles);
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }

  render() {
    let styles = this.state.responsiveStyles;

    const result = this.props.result;
    const authors = formatAuthors.join(result.authors);
    const sections = result.sections.map((section, i) => {
      return (
        <Link
          data-component='searchResult'
          to={'/realtime/sections/' + section}
          key={i}
          style={styles.link}
        >
          {section}
        </Link>
      );
    });

    let linkUrl = '/articles/' + result.article_uuid;
    const publishedDate = formatDate(result.initial_publish_date);

    const publishedMoment = moment(result.initial_publish_date);
    const now = moment();
    const diff = now.diff(publishedMoment, 'hours');

    let clickHandler = this.props.handleClick;

    if (diff < 24) {
      linkUrl = '/realtime' + linkUrl;
      clickHandler = null;
    } else if (diff < 48) {
      linkUrl = '/realtime' + linkUrl + '/48h';
      clickHandler = null;
    } else {
      linkUrl += `/custom`;
    }

    return (
      <div className="list-group-item">
        <Row>
          <Col xs={12}>
            <Link
              data-component='searchResult'
              to={linkUrl}
              key={result._id}
              onClick={clickHandler}
              uuid={result.article_uuid}
              publishDate={result.initial_publish_date}
            >
              {result.title}
            </Link>
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col xs={8} >
            <span style={styles.authors} >
              {"Authors: " + authors}
            </span>

            <span style={styles.sections} >
              {"Sections: "}
              {sections}
            </span>
          </Col>

          <Col xs={4} >
            <span
              style={styles.date}
            >
              {'Published: ' + publishedDate}
            </span>
          </Col>

        </Row>

      </div>
    );
  }
}

function formatDate(date) {
  let m = moment(date);
  return m.fromNow();
}
