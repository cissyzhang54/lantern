import React from 'react';

var styles = {
    text: {
        color: '#666',
        display: 'inline-block',
        margin: 0
    }
};

export default class InfoLabel extends React.Component {
    render() {
        if (this.props.position === 'right') styles.text.float = 'right';
        return (
            <p style={styles.text}>{this.props.text}</p>
        )
    }
}