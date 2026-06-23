const express = require("express");
const app = express();
const cors = require("cors");

const authroute = require("./routes/auth.route");

app.use(cors());

app.use(
    express.urlencoded(
        {extended:true}
    )
);
app.use(express.json());


app.use("/api/auth",authroute);


module.exports = app;