const Sauce = require("../models/sauce");

exports.findAll = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//new Sauce
exports.newSauce = (req, resp, next) => {
  const sauce = new sauceModels({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
  });
  sauce
    .save()
    .then(() => {
      resp.status(201).json({
        message: "Sauce saved successfully!",
      });
    })
    .catch((error) => {
      resp.status(400).json({
        error: error,
      });
    });
};
