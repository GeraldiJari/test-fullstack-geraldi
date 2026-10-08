const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid resource ID",
        });
    }

    // Duplicate unique field
    if (err.code === 11000) {
        return res.status(409).json({
            message: "Resource already exists",
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message,
    });
};

module.exports = errorHandler;