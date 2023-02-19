const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

async function start() {
    try {
        mongoose.connection.once("open", () => {
            console.log("once");
            initDatabase();
        })
        await mongoose.connect(config.get("mongoUri"));
        console.log(chalk.green("MongoDB connected."));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}`));
        })
    } catch (e) {
        console.log(chalk.red(e.message));
        process.exit(1);
    }
}

start();
