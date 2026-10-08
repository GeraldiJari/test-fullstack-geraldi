require("dotenv").config();

const app = require("./src/app");
const connectDatabase = require("./src/config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();