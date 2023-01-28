const express = require("express");
const { isParameter } = require("typescript");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");

const auth = require("../middleware/auth");

router.get("/", auth, sauceCtrl.findAll);
//TODO add auth middleware for saving a sauce
router.post("/",auth, multer, sauceCtrl.newSauce);

module.exports = router;