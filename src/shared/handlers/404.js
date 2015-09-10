import React from 'react/addons';
import Link from 'react-router/lib/components/Link';
import DocumentTitle from 'react-document-title';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Header from "../components/Header";
import responsiveStyles from '../utils/responsiveStyles';

const images = {
  'default': {
    img: '/404.png'
  },
  '(max-width: 500px)': {
    img: '/404-small.png'
  }
};

class Error404View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responsiveStyles : images['default']
    };
  }

  componentDidMount() {
    responsiveStyles.addListeners(this, images);
    let analytics = require('../utils/analytics');
    analytics.sendGAEvent('pageview');
  }

  componentWillUnmount() {
    responsiveStyles.removeListeners(this);
  }


  render() {
    let styles = this.state.responsiveStyles;
    let title = 'Lantern - Page Not Found'
    return (<DocumentTitle title={title}>
      <div>

        <main>
          <Row>
            <Col xs={12}  >
              <img src={styles.img} />
            </Col>
          </Row>
        </main>
      </div>
    </DocumentTitle>);
  }
}

export default Error404View;
