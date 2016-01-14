import React from "react";
import Error404 from '../handlers/404';
import { Link } from "react-router";


const ERRORS = {
  401: (category, extra) => {
    let title = "Lantern - " + category + " Unuathorised"
    return (<div>
    <Error404
      title={title}
      message={[
              'Unauthorised',
              <p key="mon-amour">
                {'Perhaps your session expired. Please try '}
                <a
                  href='/auth/google'
                  key="loginLink"
                >
                  {'logging in again'}
                </a>
              </p>,
              ]}
      extra={<pre>
                {extra}
              </pre>
            }
    />
  </div>)},
  404: (category, extra) => {
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
  </div>)},
  500: (category, extra) => {
    let title = "Lantern - " + category + " Internal Server Error"
    return (<div>
    <Error404
      title={title}
      message={[
              'Ooops!',
              `Our server experienced an internal error. Hopefully it's temporary and you can try again shortly.`
              ]}
      extra={<pre>
                {extra}
              </pre>
            }
    />
  </div>)}
}


export default class ErrorHandler extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let status = this.props.error.status || 500;

    return (<div>
      {ERRORS[status](this.props.category, this.props.message)}
    </div>);
  }
}

ErrorHandler.propTypes = {
  category: React.PropTypes.string.isRequired,
  message: React.PropTypes.string,
  type: React.PropTypes.string.isRequired
};
