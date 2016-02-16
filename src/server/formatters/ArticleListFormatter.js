export default function(results) {
  return results.aggregations.articles.buckets.map((r) => {
    const source = r.metadata.hits.hits[0]._source;
    return {
      article_uuid: source.article_uuid,
      title: source.title,
      initial_publish_date: source.initial_publish_date,
      page_views: r.metadata.hits.total,
      time_on_page: r.avg_time_on_page.value,
      retention_rate: r.retention.doc_count / r.metadata.hits.total
    };
  });
}
