const express = require("express");
const router = express.Router();
const {project} = require("../controllers/project.controller");

router.get("/projects",project);


module.exports = router;

