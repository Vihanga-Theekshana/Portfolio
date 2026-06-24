const express = require("express");
const router = express.Router();
const {project,deleteproject} = require("../controllers/project.controller");

router.get("/projects",project);
router.delete("/projects/:id",deleteproject);


module.exports = router;

