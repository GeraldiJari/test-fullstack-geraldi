require("dotenv").config();

const mongoose = require("mongoose");
const Item = require("../src/models/Item");

const items = [
    {
        name: "Amiya AC Figure",
        description: "My Anak Gua Nih.",
        stock: 12,
        price: 111111,
    },
    {
        name: "Exusiai AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 8,
        price: 111111,
    },
    {
        name: "Texas AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 10,
        price: 111111,
    },
    {
        name: "Lappland AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 6,
        price: 111111,
    },
    {
        name: "Projekt Red AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 7,
        price: 111111,
    },
    {
        name: "Kal'tsit AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 5,
        price: 111111,
    },
    {
        name: "SilverAsh AC Figure",
        description: "Adu Catur Sini By One.",
        stock: 9,
        price: 111111,
    },
    {
        name: "Thorns AC Figure",
        description: "Gelut Sini.",
        stock: 11,
        price: 111111,
    },
    {
        name: "Surtr AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 4,
        price: 111111,
    },
    {
        name: "Mudrock AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 6,
        price: 111111,
    },
    {
        name: "Ch'en AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 10,
        price: 111111,
    },
    {
        name: "Hoshiguma AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 8,
        price: 111111,
    },
    {
        name: "Saria AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 9,
        price: 111111,
    },
    {
        name: "Ifrit AC Figure",
        description: "My Ayang Gua Nih Eh Anak Gue Nih.",
        stock: 13,
        price: 111111,
    },
    {
        name: "Eyjafjalla AC Figure",
        description: "My Goat dan Ayang Gua Nih.",
        stock: 7,
        price: 111111,
    },
    {
        name: "Angelina AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 10,
        price: 111111,
    },
    {
        name: "Skadi AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 6,
        price: 111111,
    },
    {
        name: "Specter AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 5,
        price: 111111,
    },
    {
        name: "W AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 8,
        price: 111111,
    },
    {
        name: "Rosmontis AC Figure",
        description: "My Ayang Gua Nih. Eh Anak Gue Nih.",
        stock: 6,
        price: 111111,
    },
    {
        name: "Aak AC Figure",
        description: "Furry Solid.",
        stock: 4,
        price: 111111,
    },
    {
        name: "Blaze AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 9,
        price: 111111,
    },
    {
        name: "Bagpipe AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 11,
        price: 111111,
    },
    {
        name: "Myrtle AC Figure",
        description: "My Ayang Gua Nih.",
        stock: 15,
        price: 111111,
    },
    {
        name: "Elysium AC Figure",
        description: "Dimas.",
        stock: 10,
        price: 111111,
    },
    {
        name: "Ceobe AC Figure",
        description: "Ceobeeeee.",
        stock: 8,
        price: 111111,
    },
    {
        name: "Nian AC Figure",
        description: "Nian Bean.",
        stock: 5,
        price: 111111,
    },
    {
        name: "Dusk AC Figure",
        description: "Xi My Ayang Gua Nih..",
        stock: 6,
        price: 111111,
    },
    {
        name: "Ling AC Figure",
        description: "Blue Woman.",
        stock: 7,
        price: 111111,
    },
    {
        name: "Amiya Casual AC Figure",
        description: "My Anak Gua Nih.",
        stock: 14,
        price: 111111,
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected.");

        await Item.deleteMany({});

        console.log("Existing items cleared.");

        await Item.insertMany(items);

        console.log(`${items.length} items seeded successfully.`);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
    }
};

seed();