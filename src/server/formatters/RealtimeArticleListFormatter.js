export default function(results) {
  return results.aggregations.articles.buckets.map((r) => {
    const source = r.metadata.hits.hits[0]._source;
    return {
      article_uuid: source.article_uuid,
      title: source.title,
      initial_publish_date: source.initial_publish_date,
      page_views: r.page_views.doc_count,
      time_on_page: r.time_on_page.average.value
    };
  });
}

