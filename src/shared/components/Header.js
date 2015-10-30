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
      'padding': '15px 0',
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
        let url = this.props.linkURL;
        let link = <a style={styles.anchor} href={url} target='_blank'>
          {this.props.title}
          <Glyphicon glyph="new-window" style={styles.tagStyle} />
        </a>
        let title = url ? link : this.props.title
        return (
          <header style={styles.header} className="clearfix" data-component='header' >
            <div style={styles.titleContainer} >
              <h1 style={styles.title}>
                {title}
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
  author: "",
  published: ""
};

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  author: React.PropTypes.string,
  published: React.PropTypes.string
};
