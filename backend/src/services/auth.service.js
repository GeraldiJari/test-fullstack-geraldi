const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/user.repository");

const register = async ({ name, email, password }) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};

const login = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            userId: user._id.toString(),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

module.exports = {
    register,
    login,
};