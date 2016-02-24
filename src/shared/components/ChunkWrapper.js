import React from 'react';


export default class ChunkWrapper extends React.Component {

  render() {

    const style = {
      paddingTop: '20px',
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc'
    };

    if (this.props.noBorder) {
      delete style.borderBottom;
    }

    return (
      <div
        data-component={this.props.component}
        style={style} className="container-fluid">
        {this.props.children}
      </div>
    );
  }

}
