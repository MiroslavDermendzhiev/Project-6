const Sauce = require("../models/sauce");
const fs = require("fs");
const sauce = require("../models/sauce");

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
  const url = req.protocol + "://" + req.get("host");
  const parsedSaucePayload = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    userId: parsedSaucePayload.userId,
    name: parsedSaucePayload.name,
    manufacturer: parsedSaucePayload.manufacturer,
    description: parsedSaucePayload.description,
    mainPepper: parsedSaucePayload.mainPepper,
    imageUrl: url + "/images/" + parsedSaucePayload.filename, // "TODO...",
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

//update sauce
exports.updateSauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    const parsedSaucePayload = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      userId: parsedSaucePayload.userId,
      name: parsedSaucePayload.name,
      manufacturer: parsedSaucePayload.manufacturer,
      description: parsedSaucePayload.description,
      mainPepper: parsedSaucePayload.mainPepper,
      imageUrl: url + "/images/" + parsedSaucePayload.filename, // "TODO...",
      heat: parsedSaucePayload.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    };
  } else {
    sauce = {
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: url + "/images/" + req.file.filename, // "TODO...",
      heat: req.body.heat,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: [],
    };
  }

  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      resp.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      resp.status(400),
        json({
          error: error,
        });
    });
};

// delete sauce

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

//like, dislike sauces

exports.likeSauce = (req, res, next) => {
  const liker = req.body.userId;
  let likeStatus = req.body.like;
  sauce
    .findOne({ _id: req.params.id })
    .then((votedSauce) => {
      if (likeStatus === 1) {
        sauce
          .updateOne(
            { _id: req.params.id },
            { $push: { usersLiked: liker }, $inc: { likes: 1 } }
          )
          .then(() =>
            res.status(201).json({ message: "You liked this sauce!" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (likeStatus === -1) {
        sauce
          .updateOne(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: liker } }
          )
          .then(() =>
            res.status(201).json({ message: "You disliked this sauce!" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (likeStatus === 0) {
        if (votedSauce.usersLiked.includes(liker)) {
          sauce
            .updateSauce(
              { _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: liker } }
            )
            .then(() =>
              res.status(201).json({ message: "You un-liked this sauce!" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (votedSauce.usersDisliked.includes(liker)) {
          sauce
            .updateOne(
              { _id: req.params.id },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: liker } }
            )
            .then(() =>
              res.status(201).json({ message: "You un-disliked this sauce!" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
