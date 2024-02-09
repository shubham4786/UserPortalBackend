const express = require("express");
const router = new express.Router();

const userImfoController = require("../controllers/userImfo.js");

router.post("/update", userImfoController.updateImfo);

router.get("/details", userImfoController.getDetails);

module.exports = router;
