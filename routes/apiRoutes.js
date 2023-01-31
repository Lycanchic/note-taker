const express = require('express');
const router = express.Router();
const noteList = [];
const fs = require('fs');
const path = require('path');

// Get all notes
router.get('/notes', (req, res) => {
    let db = fs.readFileSync(path.join(__dirname, "../db/db.json"))
    db = JSON.parse(db)
    res.json(db);
});

// Create a new note
router.post('/notes', (req, res) => {
    // Validate the request body
    if (!req.body.text&& ! req.body.title) {
        return res.status(400).json({ error: 'Content is required' });
    }
  let db = fs.readFileSync(path.join(__dirname, "../db/db.json"))

  db = JSON.parse(db)
    // Create the new note
    const newNote = {
        id: noteList.length.toString(),
        text: req.body.text, 
        title: req.body.title,
    };
    db.push(newNote);
    fs.writeFileSync(path.join(__dirname, "..db/db.json"), JSON.stringify(db)
    ) 
    res.status(201).json(db);
});

// Delete a note
router.delete('/notes/:id', (req, res) => {
    let db = fs.readFileSync(path.join(__dirname, "..db/db.json"))
    db = JSON.parse(db)
    // Find the index of the note to delete
    const noteIndex = db.findIndex(note => note.id === req.params.id);

    // If the note doesn't exist, return a 404
    if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' });
    }

    // Delete the note and return the updated list
    db.splice(noteIndex, 1);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(db)
    ) 
    res.status(204).json(db);
});

module.exports = router;