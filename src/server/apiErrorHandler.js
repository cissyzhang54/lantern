export default function ErrorHandler(app) {

  return function devHandler (err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: err,
        status: res.statusCode
    });
  };

}
