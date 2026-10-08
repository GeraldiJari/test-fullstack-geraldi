const express = require("express");

const itemController = require("../controllers/item.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    createItemValidator,
    updateItemValidator,
    decreaseStockValidator,
} = require("../validators/item.validator");

const router = express.Router();

router.use(authenticate);

router.post(
    "/",
    createItemValidator,
    validate,
    itemController.createItem
);

router.get(
    "/",
    itemController.getItems
);

router.patch(
    "/:id/decrease-stock",
    decreaseStockValidator,
    validate,
    itemController.decreaseStock
);

router.get(
    "/:id",
    itemController.getItemById
);

router.put(
    "/:id",
    updateItemValidator,
    validate,
    itemController.updateItem
);

router.delete(
    "/:id",
    itemController.deleteItem
);

module.exports = router;