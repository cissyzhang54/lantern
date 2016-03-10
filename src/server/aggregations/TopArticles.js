export default function TopArticlesAggregation() {
 return {
    top_article_views: {
      terms: {
        field: "article_uuid",
        size: 5,
        order: {
          top_article_views: "desc"
        }
      },
      aggs: {
        top_article_views: {
          filter: {
            bool: {
              must: [
                {
                  term: {
                    event_type: "page"
                  }
                },
                {
                  term: {
                    event_category: "view"
                  }
                }
              ]
            }
          },
          aggs: {
            title: {
              terms: {
                field: "title_not_analyzed"
              }
            },
            author: {
              terms: {
                field: "authors_not_analyzed"
              }
            },
            initial_publish_date : {
              terms : {
                field: "initial_publish_date"
              }
            }
          }
        }
      }
    },
    time_on_page: {
      terms: {
        field: "article_uuid",
        size: 5,
        order: {
          avg_time_on_page: "desc"
        }
      },
      aggs: {
        avg_time_on_page: {
          filter: {
            bool: {
              must: [
                {
                  term: {
                    event_type: "page"
                  }
                },
                {
                  term: {
                    event_category: "attention"
                  }
                }
              ]
            }
          },
          aggs: {
            avg_time_on_page: {
                "avg" : {
                    "field" : "attention_time"
                }
            },
            title: {
              terms: {
                field: "title_not_analyzed"
              }
            },
            author: {
              terms: {
                field: "authors_not_analyzed"
              }
            },
            initial_publish_date : {
              terms : {
                field: "initial_publish_date"
              }
            }
          }
        }
      }
    },
    top_articles_search_ref: {
      terms: {
        field: "article_uuid",
        size: 5,
        order: {
          views: "desc"
        }
      },
      aggs: {
        views: {
          filter: {
            bool: {
              must: [
                {
                  term: {
                    event_type: "page"
                  }
                },
                {
                  term: {
                    event_category: "view"
                  }
                },
                {
                  term: {
                    "referrer_type" : "search"
                  }
                }
              ]
            }
          },
          aggs: {
            title: {
              terms: {
                field: "title_not_analyzed"
              }
            },
            author: {
              terms: {
                field: "authors_not_analyzed"
              }
            },
            initial_publish_date : {
              terms : {
                field: "initial_publish_date"
              }
            }
          }
        }
      }
    },
    top_articles_social_ref: {
      terms: {
        field: "article_uuid",
        size: 5,
        order: {
          views: "desc"
        }
      },
      aggs: {
        views: {
          filter: {
            bool: {
              must: [
                {
                  term: {
                    event_type: "page"
                  }
                },
                {
                  term: {
                    event_category: "view"
                  }
                },
                {
                  term: {
                    "referrer_type" : "social media"
                  }
                }
              ]
            }
          },
          aggs: {
            title: {
              terms: {
                field: "title_not_analyzed"
              }
            },
            author: {
              terms: {
                field: "authors_not_analyzed"
              }
            },
            initial_publish_date : {
              terms : {
                field: "initial_publish_date"
              }
            }
          }
        }
      }
    },
    top_articles_retention: {
      terms: {
        field: "article_uuid",
        size: 5,
        order: {
          retained_users: "desc"
        }
      },
      aggs: {
        retained_users: {
          filter: {
            bool: {
              must: [
                {
                  term: {
                    event_type: "page"
                  }
                },
                {
                  term: {
                    event_category: "view"
                  }
                },
                {
                  term: {
                    is_last_page: "F"
                  }
                }
              ]
            }
          },
          aggs: {
            retained_users: {
              cardinality: {
                field: 'visitor_id'
              }
            },
            title: {
              terms: {
                field: "title_not_analyzed"
              }
            },
            author: {
              terms: {
                field: "authors_not_analyzed"
              }
            },
            initial_publish_date : {
              terms : {
                field: "initial_publish_date"
              }
            }
          }
        }
      }
    },
    top_article_comments_posted: {
      terms: {
        field: "article_uuid",
        size: 5,
        order: {
          posts: "desc"
        }
      },
      aggs: {
        posts: {
          filter: {
            bool: {
              must: [
                {
                  term: {
                    event_type: "page"
                  }
                },
                {
                  term: {
                    event_category: "comment_posted"
                  }
                }
              ]
            }
          },
          aggs: {
            title: {
              terms: {
                field: "title_not_analyzed"
              }
            },
            author: {
              terms: {
                field: "authors_not_analyzed"
              }
            },
            initial_publish_date : {
              terms : {
                field: "initial_publish_date"
              }
            }
          }
        }
      }
    }
  }
}
