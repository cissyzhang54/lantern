import * as calculateInterval from '../utils/calculateInterval'

export default function TopArticleEventsAggregation(query) {
 return {
   "top_article_comments_posted" : {
     terms : {
       field: "article_uuid",
       size: 5,
       order : {
         "posts" : "desc"
       }
     },
     aggs : {
       posts : {
         filter: {
           bool : {
             must :[
               {term: { "event_type": "comment" }},
               {term: { "event_category": "posted" }}
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
