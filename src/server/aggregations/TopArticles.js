import * as calculateInterval from '../utils/calculateInterval'

export default function TopArticlesAggregation(query) {
 return {
   "time_on_page" : {
     terms: {
       field: "article_uuid",
       order : {
         "avg_time_on_page" : "desc"
       },
       "size": 5
     },
     aggs : {
       avg_time_on_page : {
         avg : {
           field: "time_on_page"
         }
       },
       title : {
         terms : {
           field : "title_not_analyzed"
         }
       },
       author : {
         terms : {
           field : "authors_not_analyzed"
         }
       }
     }
   },
   "top_article_views" : {
     terms : {
       field: "article_uuid",
       "order" : { "_count" : "desc" },
       size: 5
     },
     aggs : {
       count : {
         "value_count" : {
           "field" : "article_uuid"
         }
       },
       title : {
         terms : {
           field : "title_not_analyzed"
         }
       },
       author : {
         terms : {
           field : "authors_not_analyzed"
         }
       }
     }
   }
 }
}
