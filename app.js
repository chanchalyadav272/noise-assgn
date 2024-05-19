require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const sleepRoutes = require("./src/routes/sleepRoutes");
const connectDB = require("./src/databases/db");

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/sleep", sleepRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
