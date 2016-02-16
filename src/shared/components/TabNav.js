import React from "react";
import { Link } from "react-router";
import moment from 'moment';

function buildLinkList (links, currentPageType, publishDate) {
  let linkHtml = links.map((link, i) => {
    let isDisabled = checkIsDisabled(publishDate, link) ? 'tabNav__tab--disabled' : 'tabNav__tab--enabled';

    return (
      <Link className={`tabNav__tab ${isDisabled}`}
        key={i}
        to={link.url}
        activeClassName='tabNav__tab--active'
      >
        {link.title}
      </Link>
    );
  });

  return linkHtml;
}

function checkIsDisabled(publishDate, link) {
  let isDisabled = false;
  if (link.hasOwnProperty('disabled')) {
    return link.disabled;
  }
  if (typeof link.timePeriod != 'undefined') {
    isDisabled = moment().isBetween(moment(publishDate), moment(publishDate).add(link.timePeriod, 'h'));
  }

  return isDisabled;
}

export default class TabNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let links = [
      {title: "Live", url:`/realtime/articles/${this.props.uuid}`, type: "realtime-article1h"},
      {title: "Archive", url:`/articles/${this.props.uuid}`, type: "article", timePeriod: 24}
    ];

    if (this.props.links) links = this.props.links;

    let linkHtml = buildLinkList(links, this.props.analyticsView, this.props.publishDate);

    return (
      <div data-component='navigationTabs'>
        <nav className="tabNav">
          {linkHtml}
        </nav>
      </div>
    )
  }
}
