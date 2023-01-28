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
  const url = req.protocol + '://' + req.get('host');
  const parsedSaucePayload = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    userId: parsedSaucePayload.userId,
    name: parsedSaucePayload.name,
    manufacturer: parsedSaucePayload.manufacturer,
    description: parsedSaucePayload.description,
    mainPepper: parsedSaucePayload.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,   // "TODO...",
    heat: parsedSaucePayload.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
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
