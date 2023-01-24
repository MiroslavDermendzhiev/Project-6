const express = require("express");
const { isParameter } = require("typescript");
const router = express.Router();
const sauceCtrl = require("../controllers/sauce");

const auth = require("../middleware/auth");

router.get("/", auth, sauceCtrl.findAll);
router.post("/", sauceCtrl.newSauce);

module.exports = router;
