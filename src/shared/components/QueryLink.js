import React from "react";
import { Link } from "react-router";
import assign from 'object-assign';

export default class QueryLink extends React.Component {
  render() {

    let query = this.props;
    let url;

    switch (this.props.type){
      case 'section' :
      case 'topic' :
        if (query.comparatorType) {
          url = `/${query.type}s/${(query.type == 'section') ? query.section : query.topic}/${query.timespan}/${query.comparatorType}/${query.comparator}`;
        }
        else {
          url = `/${query.type}s/${(query.type == 'section') ? query.section : query.topic}/${query.timespan}`
        }
        break;
      case 'article' :
        url = `/${query.type}s/${query.uuid}/${query.timespan}/${query.comparatorType}/${query.comparator}`
        break;
      case 'realtimeArticle' :
        url = `/realtime/articles/${query.uuid}/${query.timespan}`
        break;
    }

    return (
      <Link data-component="queryLink" className="queryLink btn btn-default" activeClassName="active"
            to={url}
        >
        {this.props.children}
      </Link>
    );
  }
}
