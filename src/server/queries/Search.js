export default function SearchQuery(query) {
  return {
    "query" : {
      "match" : {
          "title": query
      }
    }
  };
}
