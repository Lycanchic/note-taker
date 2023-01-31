const PORT = process.env.PORT || 3001;
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
/*require('dotenv').config();*/

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const dbPath = path.join(__dirname, '/db/db.json');

// Get all notes
app.route('/api/notes')
  .get((req, res) => {
    fs.readFile(dbPath)
      .then(data => {
        const allNotes = JSON.parse(data);
        res.json(allNotes);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })

// Create new note
  .post((req, res) => {
    fs.readFile(dbPath)
      .then(data => {
        const allNotes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = allNotes.length ? allNotes[allNotes.length - 1].id + 1 : 1;
        allNotes.push(newNote);
        return fs.writeFile(dbPath, JSON.stringify(allNotes));
      })
      .then(() => {
        res.json(allNotes);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

app.listen(PORT, () =>
console.log(`Server listening on port ${PORT}`)
);

