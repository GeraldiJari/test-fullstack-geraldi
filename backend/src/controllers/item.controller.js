const itemService = require("../services/item.service");

const createItem = async (req, res, next) => {
    try {
        const item = await itemService.createItem(req.body);

        res.status(201).json({
            message: "Item created successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

const getItems = async (req, res, next) => {
    try {
        const result = await itemService.getItems(req.query);

        res.status(200).json({
            message: "Items retrieved successfully",
            data: result.items,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

const getItemById = async (req, res, next) => {
    try {
        const item = await itemService.getItemById(
            req.params.id
        );

        res.status(200).json({
            message: "Item retrieved successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

const updateItem = async (req, res, next) => {
    try {
        const item = await itemService.updateItem(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Item updated successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const item = await itemService.deleteItem(
            req.params.id
        );

        res.status(200).json({
            message: "Item deleted successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

const decreaseStock = async (req, res, next) => {
    try {
        const item = await itemService.decreaseStock(
            req.params.id,
            req.body.quantity
        );

        res.status(200).json({
            message: "Stock decreased successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    decreaseStock,
};