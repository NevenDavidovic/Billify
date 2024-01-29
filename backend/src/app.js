const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 8081);
