const express = require("express");
const IncidentController = require("../controllers/incident")

const api = express.Router();

api.post("/createIncident",IncidentController.createIncident);
api.get("/getIncidents",IncidentController.getIncidents);
api.get("/getIncidentsByState",IncidentController.getIncidentsByState);
api.get("/getIncidentsBySeverity",IncidentController.getIncidentsBySeverity);
api.put("/updateIncident",IncidentController.updateIncident);
api.delete("/deleteIncident",IncidentController.deleteIncident);

module.exports = api;