const PORT = process.env.PORT || 3001;
const express = require('express');
const fs = require('fs');
const path = require('path');

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

const allNotes = require('./db/db.json');

// Get all notes
app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});

// Create new note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let id = 0;
    if (allNotes.length > 0) {
        id = allNotes[allNotes.length - 1].id + 1;
    }
    newNote.id = id;
    allNotes
  })

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

