const mongodbErrorHandler = require("mongoose-mongodb-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const sauceModels = require("./models/sauce");
const Sauce = require("./models/sauce");
const app = express();
const enableCors = (req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
};

const env = process.env;
const url = `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    mongoose.plugin(mongodbErrorHandler);
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use(enableCors);
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);

app.use("/api/sauces", sauceRoutes);

module.exports = app;
