import React from "react";
import Text from "./Text";

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
      text = <Text type='text' message='components.modifierDescription.text' formattedArticleCount={formattedArticleCount} comparator={comparator} />
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
