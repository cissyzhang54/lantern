import React from "react";
import Alert from 'react-bootstrap/lib/Alert';
import Logo from "../components/Logo";
import Error404 from '../handlers/404';

const STYLES = {
  MASK: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 2,
    cursor:'wait',
    background: 'rgba(255, 255, 255, 0.4)'
  },
  LOADING: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  UPDATING : {
    position: 'fixed',
    top: '2em',
    left: '40%',
    width: '25%',
    textAlign: 'center',
    zIndex: 2
  }
};

const MESSAGES = {
  PLACEHOLDER :  (extra) => { return (<div></div>)},
  LOADING :  (category, extra) => {
    let title = "Loading " + category + "..."
    return (
    <div style={STYLES.LOADING}>
      <Logo message={title} loading />
    </div>
  )},
  UPDATING :  (category, extra) => {
    let title = "Updating " + category + "..."
    return (
    <div style={STYLES.MASK}>
      <Alert bsStyle="warning" style={STYLES.UPDATING}>
        <strong>{title}</strong>
      </Alert>
    </div>
  )},
  ERROR: (category, extra) => {
    let title = "Lantern - " + category + " Not Found"
    return (<div>
    <Error404
      title={title}
      message={[
              'Ooops!',
              `We could not find the ${category} you requested`
              ]}
      extra={<pre>
                {extra}
              </pre>
            }
    />
  </div>)}
}


export default class Messaging extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      {MESSAGES[this.props.type](this.props.category, this.props.message)}
    </div>);
  }
}

Messaging.propTypes = {
  category: React.PropTypes.string.isRequired,
  message: React.PropTypes.string,
  type: React.PropTypes.string.isRequired
};

Messaging.defaultProps = {
  type: 'LOADING',
  category: 'There are 4 message types: Loading, Updating, Error and Placeholder',
};
