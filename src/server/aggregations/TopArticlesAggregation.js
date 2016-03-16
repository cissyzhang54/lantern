export default function TopArticlesAggregation() {
 return {
   "retention_rate": {
     "terms": {
       "field": "retention_rate",
       "size": 5,
       order: {"_term": "desc"}
     },
     "aggs": {
       "metadata": {
         "top_hits": {
           "_source": {
             "include": ["article_uuid", "title", "authors", "initial_publish_date", "page_type"]
           },
           "size": 1
         }
       }
     }
   }
 }
}
