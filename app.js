const express = require("express");
const bodyParser = require("body-parser");

const config = require("./config/app");

const app = express();
const cors = require("cors");
const port = config.appPort;
const routes = require("./routers");
const errorHandlare = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(routes);
app.use(express.static(__dirname + "/public"));

app.use(errorHandlare);

app.listen(port, () => {
  console.log("Listening on port", port);
});
