const errorHandler = (req, res, next) => {
    // Middleware logic here
    next();
};

module.exports = errorHandler;
