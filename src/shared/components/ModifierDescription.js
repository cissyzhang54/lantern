import React from "react";

export default class ModifierDescription extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let articleCount = this.props.articleCount || {};
    let comparator = this.props.comparator || {};
    let text = '';

    if(typeof articleCount !== 'object' && comparator) {
      let formattedArticleCount = articleCount ? articleCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
      text = `The comparison includes ${formattedArticleCount} '${comparator}' articles`
    }

    return (
        <p data-component='modifierDescription'>
          {text}
        </p>
    );
  }
}

ModifierDescription.propTypes = {
  articleCount: React.PropTypes.number,
  comparator: React.PropTypes.string
};
