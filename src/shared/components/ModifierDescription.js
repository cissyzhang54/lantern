import React from "react";

export default class ModifierDescription extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let articleCount = this.props.articleCount;
    let comparator = this.props.comparator;
    let formattedArticleCount = articleCount ? articleCount.toLocaleString('en-gb') : '';
    let text = `The comparison includes ${formattedArticleCount} '${comparator}' articles`
    let description = comparator ? text : '';

    return (
        <p >
          {description}
        </p>
    );
  }
}

ModifierDescription.propTypes = {
  articleCount: React.PropTypes.number,
  comparator: React.PropTypes.string
};
