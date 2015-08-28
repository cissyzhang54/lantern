import React from 'react';

var styles = {
    title: {
        margin: 0
    }
};

export default class Title extends React.Component {

    render() {
        return (
            <h1 style={styles.title}>{this.props.title}</h1>
        );
    }
}

Title.defaultProps = {
  title: "Default Title"
};
