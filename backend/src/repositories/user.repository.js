const User = require("../models/User");

const findByEmail = async (email) => {
    return User.findOne({ email });
};

const findById = async (id) => {
    return User.findById(id);
};

const create = async (data) => {
    return User.create(data);
};

module.exports = {
    findByEmail,
    findById,
    create,
};