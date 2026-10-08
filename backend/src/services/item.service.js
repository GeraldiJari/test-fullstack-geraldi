const itemRepository = require("../repositories/item.repository");

const createItem = async (data) => {
    return itemRepository.create(data);
};

const getItems = async ({ search, page, limit }) => {
    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.min(
        Math.max(Number(limit) || 10, 1),
        100
    );

    const skip = (currentPage - 1) * perPage;

    const filter = {};

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    const [items, total] = await Promise.all([
        itemRepository.findAll(filter, {
            skip,
            limit: perPage,
        }),
        itemRepository.count(filter),
    ]);

    return {
        items,
        pagination: {
            page: currentPage,
            limit: perPage,
            total,
            totalPages: Math.ceil(total / perPage),
        },
    };
};

const getItemById = async (id) => {
    const item = await itemRepository.findById(id);

    if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    return item;
};

const updateItem = async (id, data) => {
    const item = await itemRepository.updateById(id, data);

    if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    return item;
};

const deleteItem = async (id) => {
    const item = await itemRepository.deleteById(id);

    if (!item) {
        const error = new Error("Item not found");
        error.statusCode = 404;
        throw error;
    }

    return item;
};

const decreaseStock = async (id, quantity = 1) => {
    const item = await itemRepository.decreaseStock(
        id,
        quantity
    );

    if (!item) {
        const existingItem = await itemRepository.findById(id);

        if (!existingItem) {
            const error = new Error("Item not found");
            error.statusCode = 404;
            throw error;
        }

        const error = new Error("Insufficient stock");
        error.statusCode = 409;
        throw error;
    }

    return item;
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    decreaseStock,
};