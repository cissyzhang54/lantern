import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import * as formatAuthors from './formatAuthors';
import moment from 'moment';

export default function getFilteredColumns(data, filterName, metric) {
  if (!metric) metric = filterName;
  const flattenedData = data.map((d) => {
    const obj = d[filterName];
    obj.key = d.key;
    if (metric != 'doc_count')
      obj.doc_count = d.doc_count;
    return obj;
  });

  return getColumns(flattenedData, metric);
}

function getColumns (data, metric) {
  let tagStyle = {
    fontSize: '15px',
    marginLeft: '8px'
  }

  return data.map((d) => {
    let uuid = d.key;
    let metricVal = d[metric];
    let title =  d.title.buckets[0] ? d.title.buckets[0].key : "Unknown"
    let author = formatAuthors.split(d);
    let articleUrl = `/articles/${uuid}`

    let publishDate = d.initial_publish_date.buckets.length > 0 ? d.initial_publish_date.buckets[0].key : moment();
    const publishedMoment = moment(publishDate);
    const now = moment();
    const diff = now.diff(publishedMoment, 'hours');

    if (diff < 24) {
      articleUrl = '/realtime' + articleUrl;
    } else if (diff < 48) {
      articleUrl = '/realtime' + articleUrl + '/48h';
    } else {
      articleUrl += '/48';
    }

    let articleUrlHTML = (
      <a href={articleUrl}
         target="_blank"
        >
        {title}
      </a>
    );

    let ftUrl = (
      <a href={`http://www.ft.com/cms/s/${uuid}.html`}
         target="_blank"
        >
        FT
        <Glyphicon glyph="new-window"
                   style={tagStyle}
          />
      </a>
    );

    return [
      articleUrlHTML, author, metricVal, ftUrl
    ];
  });
}
