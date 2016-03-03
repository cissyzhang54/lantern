export function join(authors) {
  if (!authors.length) {
    return 'Unknown author';
  }
  // copy the array so we don't mess
  // with the original
  authors = authors.slice();
  let lastAuthor = authors.pop();
  if (!authors.length) {
    return lastAuthor;
  }
  return authors.join(", ") + ' and ' + lastAuthor;
}

export function split (authors) {
    return authors.author.buckets.map((d) => {
        return d.key;
    }).join(", ") || 'Unknown author';
}
