const express = require("express");
const app = express();
const cors = require("cors");

const authroute = require("./routes/auth.route");
const projectroute = require("./routes/project.route");

app.use(cors());

app.use(
    express.urlencoded(
        {extended:true}
    )
);
app.use(express.json());


app.use("/api/auth",authroute);
app.use("/api/projects",projectroute);



module.exports = app;