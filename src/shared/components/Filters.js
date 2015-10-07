import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Filter from './Filter';

const fakeData = {
  filters : [
    {
      name: 'Country',
      options: ['uk', 'us', 'jap']
    },
    {
      name: 'Device',
      options: ['mobile', 'tablet', 'desktop']
    },
    {
      name: 'User Types',
      options: ['Banker', 'Assasin', 'Oligarch']
    },
    {
      name: 'Referrers',
      options: ['Twitter', 'Facebook', 'Google']
    }
  ]
};

export default class Filters extends React.Component {
  render() {
    var filters = fakeData.filters.map((f, i) => {
      return (
        <Col sm={2} xs={6} key={i}>
          <Filter
            name={f.name}
            options={f.options}
            onChange={this.props.onChange}
            />
        </Col>
      );
    });

    return (
      <div>
        {filters}
      </div>
    );
  }
}

Filters.propTypes = {
  onChange: React.PropTypes.func
}

Filters.defaultProps = {
  onChange: _ => {console.log(_)}
}
