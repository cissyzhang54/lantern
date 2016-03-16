import React from "react";
import DocumentTitle from 'react-document-title';
import Link from 'react-router/lib/Link';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

export default class Playground extends React.Component {
  render() {

    const styles = {
      sidebarStyles : {
        backgroundColor: '#f8f8f8',
        border: '1px solid #e7e7e7',
        padding: '10px',
        borderRadius: '3px'
      },
      title : {
        margin: '15px 0'
      },
      li : {
        listStyle: 'none'
      }
    };

    const components = [
      { title : 'Bar Chart', url : '/playground/barChart' },
      { title : 'Column Chart', url : '/playground/columnChart' },
      { title : 'Date Range', url : '/playground/dateRange' },
      { title : 'Dual Scale Chart', url : '/playground/dualScaleLineChart' },
      { title : 'Filter', url : '/playground/filter' },
      { title : 'Filters', url : '/playground/filters' },
      { title : 'Header', url : '/playground/header' },
      { title : 'Line Chart', url : '/playground/lineChart' },
      { title : 'Live Indicator', url : '/playground/liveIndicator' },
      { title : 'Logo SVG', url : '/playground/logoSVG' },
      { title : 'Logo', url : '/playground/logo' },
      { title : 'Map', url : '/playground/map' },
      { title : 'Messaging', url : '/playground/messaging' },
      { title : 'Modifier Description', url : '/playground/modifierDescription' },
      { title : 'Pie Chart', url : '/playground/pieChart' },
      { title : 'Recent Articles', url : '/playground/recentArticles' },
      { title : 'Search', url : '/playground/search' },
      { title : 'Single Metric', url : '/playground/singleMetric' },
      { title : 'Table', url : '/playground/table' },
      { title : 'Tag', url : '/playground/tag' },
      { title : 'Tags', url : '/playground/tags' },
      { title : 'Text', url : '/playground/text' },
      { title : 'User', url : '/playground/user' }
    ];

    let navigationLinks = components.map((d, i) => {
      return (
        <li key={i}
          style={styles.li}
        >
          <Link to={d.url}>
            {d.title}
          </Link>
        </li>
      )
    });

    let title = 'Lantern -  Playground';

    return (<DocumentTitle title={title}><div>
      <Row>
        <Col xs={12}>
          <h2 style={styles.title}>Playground</h2>
        </Col>
      </Row>

      <Row>
        <Col
          xs={12}
          sm={3}
        >
          <h3>Components</h3>
          <ul style={styles.sidebarStyles}>
            {navigationLinks}
          </ul>
        </Col>
        <Col
          xs={12}
          sm={9}
          className="stage"
        >
          {this.props.children}
        </Col>
      </Row>

    </div></DocumentTitle>);
  }
}
