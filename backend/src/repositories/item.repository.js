const Item = require("../models/Item");

const create = async (data) => {
    return Item.create(data);
};

const findAll = async (filter = {}, options = {}) => {
    const {
        skip = 0,
        limit = 10,
    } = options;

    return Item.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
};

const count = async (filter = {}) => {
    return Item.countDocuments(filter);
};

const findById = async (id) => {
    return Item.findById(id);
};

const updateById = async (id, data) => {
    return Item.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteById = async (id) => {
    return Item.findByIdAndDelete(id);
};

const decreaseStock = async (id, quantity) => {
    return Item.findOneAndUpdate(
        {
            _id: id,
            stock: { $gte: quantity },
        },
        {
            $inc: {
                stock: -quantity,
            },
        },
        {
            new: true,
        }
    );
};

module.exports = {
    create,
    findAll,
    count,
    findById,
    updateById,
    deleteById,
    decreaseStock,
};