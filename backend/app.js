// cluster pass: BdICbIAkRW4YNSeJ
//connection string: mongodb+srv://MiroBeroe:<password>@cluster0.vmtbfnm.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://MiroBeroe:BdICbIAkRW4YNSeJ@cluster0.vmtbfnm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

app.use((req, resp, next) => {
  console.log("Request received!");
  next();
});

app.use((req, resp, next) => {
  resp.status(201);
  next();
});

app.use((req, resp, next) => {
  resp.json({ message: "Your request was successful!" });
  next();
});

app.use((req, resp, next) => {
  console.log("Responce sent successfully!");
});

module.exports = app;
