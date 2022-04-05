const express = require("express"); //
const cors = require("cors");
const app = express(); //

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const incident_routes = require("./routes/incident") //

app.use("/api",incident_routes); //


module.exports = app; //