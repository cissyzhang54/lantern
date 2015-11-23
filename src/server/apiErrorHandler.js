import LoggerFactory from './logger';
let Logger = LoggerFactory('Api');
let logger = new Logger();

export function routes(app) {

  return function handler (err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: err,
        status: res.statusCode
    });
    logger.error(err);
  };

}

export function statusCode(errorName){
  switch (errorName) {
    case 'ArticleNotFoundError':
      return 404;
      break;
    case 'ComparatorNotFoundError':
      return 404;
      break;
    case 'DataParsingError':
      return 500;
      break;
    default:
      return 500;
      break;
  }
}
