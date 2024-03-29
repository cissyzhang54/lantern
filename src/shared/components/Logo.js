import React from "react";
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

const style = {
  textAlign:'center',
  margin:0,
  minHeight:'3em',
  lineHeight:'3em'
}
const container = {
  marginTop: '30px'
}

const searchHTML = (
  <div className="magnifying-glass logo">
    <div className="magnifying-glass__glass"></div>
    <div className="magnifying-glass__join"></div>
    <div className="magnifying-glass__rod"></div>
  </div>
);

export default class Logo extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let body = document.querySelector('body')
    if (!body.classList) return;
    body.classList.add('loading-mounted');
  }

  render() {
    let additionalHTML;
    let classNames = ['lantern', 'logo']
    if (this.props.search) classNames.push('lantern--search')
    if (this.props.search) additionalHTML = searchHTML
    if (this.props.loading) classNames.push('loading')
    if (this.props.error) classNames.push('error')
    let messages = Array.isArray(this.props.message) ? this.props.message : [this.props.message];
    let message = messages.map(function(str, index){
      return <div key={index} style={style}>{str}</div>
    });
    let logo = (
      <div style={container} className="logo-container">
        <div className={classNames.join(' ')}>
          <div className="lantern__circle">
            <div className="lantern__hoop"></div>
            <div className="lantern__lid lantern__lid--upper"></div>
            <div className="lantern__lid lantern__lid--lower"></div>
            <div className="lantern__glass">
              <div className="lantern__flame"></div>
              <div className="lantern__wick"></div>
            </div>
            <div className="lantern__neck"></div>
            <div className="lantern__base lantern__base--lupper"></div>
            <div className="lantern__base lantern__base--lower"></div>
          </div>
          {additionalHTML}
        </div>
      </div>
    );
    return (
      <div
        className='logo'
        data-component='logo'>
        {this.props.displayLogo ? logo : null}
        {message}
      </div>);
  }
}

Logo.propTypes = {
  displayLogo: React.PropTypes.bool
};

Logo.defaultProps = {
  displayLogo : true
};
