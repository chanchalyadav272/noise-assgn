const mongoose = require("mongoose");
require("dotenv").config();

// function to connect server to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

module.exports = connectDB;
