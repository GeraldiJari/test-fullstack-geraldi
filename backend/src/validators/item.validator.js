const { body } = require("express-validator");

const createItemValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer")
        .toInt(),

    body("price")
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number")
        .toFloat(),
];

const updateItemValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer")
        .toInt(),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number")
        .toFloat(),
];

const decreaseStockValidator = [
    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer")
        .toInt(),
];

module.exports = {
    createItemValidator,
    updateItemValidator,
    decreaseStockValidator,
};