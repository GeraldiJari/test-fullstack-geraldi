const express = require("express");

const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Inventory Management API",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.use(errorHandler);

module.exports = app;