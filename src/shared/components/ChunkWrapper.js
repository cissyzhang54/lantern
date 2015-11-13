import React from 'react';


export default class ChunkWrapper extends React.Component {

  render() {

    const style = {
      marginTop: '40px',
      paddingTop: '10px',
      borderTop: '1px solid #ccc'
    };

    return (
      <div
        data-component={this.props.component}
        style={style}>
        {this.props.children}
      </div>
    );
  }

}
