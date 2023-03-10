const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");

const auth = require("../middleware/auth");

router.get("/", auth, sauceCtrl.findAll);

router.post("/", auth, multer, sauceCtrl.newSauce);

router.get("/:id", auth, sauceCtrl.findOne); // we use ":" to express that the id is going to be a dinamic parameter
//update a sauce
router.put("/:id", auth, multer, sauceCtrl.updateSauce);

//delete a sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//like, dislike sauces
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
