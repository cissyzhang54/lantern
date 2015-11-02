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
