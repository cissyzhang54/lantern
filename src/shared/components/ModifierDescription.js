import React from "react";

export default class ModifierDescription extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let articleCount = typeof this.props.articleCount  == 'number' ? this.props.articleCount  : false;
    let comparator = typeof this.props.comparator  == 'string' ? this.props.comparator  : false;
    let text = '';

    if(articleCount && comparator) {
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
