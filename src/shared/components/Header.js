import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import responsiveStyles from '../utils/responsiveStyles';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const componentStyles = {
  'default': {
    title: {
      margin: 0,
      textAlign: 'center',
      color: '#333'
    },
    titleContainer: {
      verticalAlign: 'middle'
    },
    text: {
      color: '#666',
      display: 'inline-block',
      margin: 0
    },
    header : {
      'padding': '10px 0',
      'borderBottom': '1px solid #ccc'
    },
    tagStyle : {
      fontSize: '15px',
      marginLeft: '8px'
    },
    anchor :{
      color: '#333'
    }
  },
  '(max-width: 500px)': {
    title: {
      fontSize: '24px'
    },
    text: {
      fontSize: '12px'
    }
  }
};

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responsiveStyles : componentStyles['default']
        };
    }

    componentDidMount() {
        responsiveStyles.addListeners(this, componentStyles);
    }

    componentWillUnmount() {
        responsiveStyles.removeListeners(this);
    }

    render() {
        let styles = this.state.responsiveStyles;
        let articleUrl = 'http://www.ft.com/cms/s/0/' + this.props.uuid + '.html';
        return (
          <header style={styles.header} className="clearfix"  >
            <div style={styles.titleContainer} >
              <h1 style={styles.title}>
                <a style={styles.anchor} href={articleUrl} target='_blank'>
                  {this.props.title}
                  <Glyphicon glyph="new-window" style={styles.tagStyle} />
                </a>
              </h1>
              <p style={styles.text}>{this.props.author}</p>
              <p style={styles.text} className="pull-right">{this.props.published}</p>
            </div>
          </header>
        );
    }
}

Header.defaultProps = {
  title: "Default Title",
  author: "Some author",
  published: "2 days ago"
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string.isRequired,
  published: React.PropTypes.string.isRequired
};
