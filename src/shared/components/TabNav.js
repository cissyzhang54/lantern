import React from "react";
import { Link } from "react-router";
import moment from 'moment';

function test (links, currentPageType, publishDate) {
  let linkHtml = links.map((link, i) => {
    let isCurrentPage = currentPageType === link.type ? 'tabNav__tab--active' : '';
    let isDisabled = checkIsDisabled(publishDate, link) ? 'tabNav__tab--disabled' : 'tabNav__tab--enabled';

    return (
      <Link className={`tabNav__tab ${isCurrentPage} ${isDisabled}`}
        key={i}
        to={link.url}
      >
        {link.title}
      </Link>
    );
  });

  return linkHtml;
}

function checkIsDisabled(publishDate, link) {
  let isDisabled = false;

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
      {title: "Last hour", url:`/realtime/articles/${this.props.uuid}`, type: "realtime1h"},
      {title: "Last 48 hours", url:`/realtime/articles/${this.props.uuid}/48h`, type: "realtime48h"},
      {title: "Historical", url:`/articles/${this.props.uuid}`, type: "article", timePeriod: 24}
    ];

    if (this.props.links) links = this.props.links;

    let linkHtml = test(links, this.props.analyticsView, this.props.publishDate);

    return (
      <div data-component='navigationTabs'>
        <nav className="tabNav">
          {linkHtml}
        </nav>
      </div>
    )
  }
}
