const verifyToken = (req, res, next) => {
    // Middleware logic here
    next();
};

module.exports = verifyToken;
