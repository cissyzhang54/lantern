import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import * as formatAuthors from './formatAuthors';
import moment from 'moment';

const tagStyle = {
  fontSize: '15px',
  marginLeft: '8px'
}

export function getFilteredColumns(data, filterName, metric) {
  if (!metric) metric = filterName;

  const flattenedData = data.map((d) => {
    const obj = d[filterName];
    obj.key = d.key;

    if (metric != 'doc_count')
      obj.doc_count = d.doc_count;

    return {
      uuid : obj.key,
      value : obj.doc_count,
      author : formatAuthors.split(obj),
      title : obj.title.buckets[0] ? obj.title.buckets[0].key : "Unknown",
      date : obj.initial_publish_date.buckets[0] ? obj.initial_publish_date.buckets[0].key : moment()
    };
  });

  return flattenedData;
}

export function createRowMarkUp (data, isRealTime) {
  return data.map((row) => {
    let uuid = row.uuid;
    let title = row.title
    let author = row.author;
    let value = row.value;
    let articleUrl = liveOrArchive(row.date, uuid, isRealTime)
    let lanternLinkHTML = lanternLink(title, articleUrl)
    let ftLinkHTML = ftLink(uuid)

    return [lanternLinkHTML, author, value, ftLinkHTML]
  });
}

function liveOrArchive (date, uuid, isRealTime) {
  let publishDate = date ? date : moment();
  const publishedMoment = moment(publishDate);
  const now = moment();
  const diff = now.diff(publishedMoment, 'hours');
  let articleUrl = `/articles/${uuid}`;

  if (diff < 24 || isRealTime) {
    articleUrl = '/realtime' + articleUrl;
  } else if (diff < 48) {
    articleUrl = '/realtime' + articleUrl + '/48h';
  } else {
    articleUrl += '/48';
  }

  return articleUrl;
}

function lanternLink (title, articleUrl) {
  return (
    <a href={articleUrl}
       target="_blank"
      >
      {title}
    </a>
  );
}

function ftLink (uuid) {
  return (
    <a href={`http://www.ft.com/cms/s/${uuid}.html`}
       target="_blank"
      >
      FT
      <Glyphicon glyph="new-window"
                 style={tagStyle}
        />
    </a>
  );
}
