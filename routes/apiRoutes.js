// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var notesData = require("../db/db");
const { v4 : uuidv4 } = require("uuid");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });
  app.post("/api/notes", function(req, res) {
    const newId = uuidv4();
    req.body.id = newId;
    notesData.push(req.body);
    res.send(notesData);
  });
  app.delete("/api/notes/:id", function(req, res) {
    notesData = notesData.filter(note=> {
      if (note.id == req.params.id) {
        return false;
      }
      return true;
    });
    res.send(notesData);
  })
};