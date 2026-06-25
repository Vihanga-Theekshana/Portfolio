const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const authroute = require("./routes/auth.route");
const projectroute = require("./routes/project.route");
const messageroute = require("./routes/message.route");

app.use(cors());

app.use(
    express.urlencoded(
        { extended: true }
    )
);
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploaded project images statically
app.use("/api/upload", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authroute);
app.use("/api/projects", projectroute);
app.use("/api/message",messageroute);




module.exports = app;