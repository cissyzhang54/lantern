import React from 'react';
import Title from './Title';
import InfoLabel from './InfoLabel';
import Logo from './Logo';

var styles = {
    header : {
        width: '100%',
        'borderBottom': '1px solid #ccc'
    },
    titleContainer: {
        'verticalAlign': 'middle',
        display: 'inline-block'
    }
};

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.propTypes = {
          title: React.PropTypes.string.isRequired,
          author: React.PropTypes.string.isRequired,
          published: React.PropTypes.string.isRequired,
          logoUrl: React.PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <header style={styles.header}>
                <Logo src={this.props.logoSrc} />
                <div style={styles.titleContainer}>
                  <Title title={this.props.title} />
                  <InfoLabel text={this.props.author} position="left" />
                  <InfoLabel text={this.props.published} position="right" />
                </div>
            </header>
        );
    }
}
