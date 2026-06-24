const express = require("express");
const router = express.Router();
const sendmessage = require("../controllers/message.controller");

router.post("/sendmessage",sendmessage);



module.exports = router;