export default {
    "query" : {
        "filtered" : {
            "query" : {
                "match": {
                    "article_uuid": "f02cca28-9028-11e5-bd82-c1fb87bef7af"
                }
            },
            "filter" : {
                "range": {
                    "event_timestamp": {
                        "from" : "2015-11-24T10:15:00.000",
                        "to" : "2015-11-24T11:15:00.000"
                    }
                }
            }
        }
    },
    "aggs" : {
        "page_views": {
            "filter" : {
                "bool" : {
                    "must": [
                        {
                            "term" : {
                                "event_type" : "page"
                            }
                        },
                        {
                            "term" : {
                                "event_category" : "view"
                            }
                        }
                    ]
                }

            },
            "aggs" : {
                "filtered" : {
                    "date_histogram" : {
                        "field" : "event_timestamp",
                        "interval" : "5s",
                        "min_doc_count" : 0
                    }
                }
            }
        }

    }
}
