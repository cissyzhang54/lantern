import React from 'react';
import Link from 'react-router/lib/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Logo from '../components/Logo';

class Error404View extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let analytics = require('../utils/analytics');
    analytics.sendGAPageViewEvent();
  }

  render() {
    let title = this.props.title;
    let message = this.props.message;
    let extraMessage = this.props.extra;

    return (<DocumentTitle title={title}>
      <div>
        <main>
          <Row>
            <Col xs={12}  >
              <Logo message={message} error />
            </Col>
          </Row>
          <Row
            style={{
              fontSize: '0.75em',
              marginTop: '40px'
            }}>
            <Col xs={12} >
              { extraMessage }
            </Col>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

Error404View.defaultProps = {
   title : 'Lantern - Page Not Found',
   message : [
     "Ooops!",
     "We could not find the page you requested."
   ],
   extra: ''
};

export default Error404View;
