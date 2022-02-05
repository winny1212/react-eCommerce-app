//for not find a product
const notFound = (req, res, next) => {
  const error = new Error(`Oops, can't finf it - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//function of errorhandle
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
