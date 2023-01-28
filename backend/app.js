// cluster pass: BdICbIAkRW4YNSeJ
//connection string: mongodb+srv://MiroBeroe:<password>@cluster0.vmtbfnm.mongodb.net/?retryWrites=true&w=majority
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const sauceModels = require("./models/sauce");
const sauce = require("./models/sauce");
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

mongoose
  .connect(
    "mongodb+srv://MiroBeroe:BdICbIAkRW4YNSeJ@cluster0.vmtbfnm.mongodb.net/piiquante?retryWrites=true&w=majority"
  )
  .then(() => {
    mongoose.plugin(mongodbErrorHandler);
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

// app.use((req, resp, next) => {
//   resp.status(201);
//   next();
// });

app.use(enableCors);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);

app.use("/api/sauces", sauceRoutes);
module.exports = app;
