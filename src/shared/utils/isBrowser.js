function isBrowser() {
  return (typeof window === 'undefined') ? false : true;
}

export default isBrowser;
