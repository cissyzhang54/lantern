import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Loading from '../components/Loading';

class Error404View extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
  }

  render() {
    let title = 'Lantern - Page Not Found'
    let message =["Ooops!","We could not find the article."," Perhaps the article was published less than 24 hours ago?"]
    return (<DocumentTitle title={title}>
      <div>
        <main>
          <Row>
            <Col xs={12}  >
              <Loading message={message} error />
              </Col>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default Error404View;
