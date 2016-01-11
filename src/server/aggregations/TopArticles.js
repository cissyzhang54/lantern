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
   "top_articles_search_ref" : {
     terms: {
       field: "article_uuid",
       order : {
         "views" : "desc"
       },
       size: 5
     },
     aggs : {
       views : {
         filter: {
           bool : {
             must :[
               {term: { "referrer_type": "search" }}
             ]
           }
         },
         aggs: {
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
 }
}
