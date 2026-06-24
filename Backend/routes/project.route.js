const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { project, deleteproject, addproject } = require("../controllers/project.controller");

router.get("/getprojects", project);
router.delete("/deleteproject/:id", deleteproject);
router.post("/addproject", upload.array("images", 4), addproject);


module.exports = router;

