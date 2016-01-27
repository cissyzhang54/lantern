import React from "react";
import { Link } from "react-router";
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import moment from 'moment';

function test (links, currentPageType, publishDate) {
  let linkHtml = links.map((link, i) => {
    let isCurrentPage = currentPageType === link.type ? 'tabNav__tab--active' : '';
    let isDisabled = checkIsDisabled(publishDate, link) ? 'tabNav__tab--disabled' : 'tabNav__tab--enabled';

    return (
      <Link className={`tabNav__tab ${isCurrentPage} ${isDisabled}`} key={i} to={link.url}>{link.title}</Link>
    )
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
      {title: "Last 24 Hours", url:`/realtime/articles/${this.props.uuid}`, type: "realtime"},
      {title: "Last 48 Hours", url:`/realtime/articles/${this.props.uuid}`, type: "realtime48"},
      {title: "Historical", url:`/articles/${this.props.uuid}`, type: "article", timePeriod: 24}
    ];
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


