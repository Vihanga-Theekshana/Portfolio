const app = require("./app");

const port = 8080;
const host = "127.0.0.1"

const server = app.listen(port, () => {
  console.log("server listening on port: " + port);
});
