import LoggerFactory from './logger';
let Logger = LoggerFactory('Api');
let logger = new Logger();

export default function ErrorHandler(app) {

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
