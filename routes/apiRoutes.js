//
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

router.post('/notes', (req, res) => {
    //req.body holds params that are sent from the client as part of a POST request
    req.body.id = notes.length.toString();
    let note = noteCreateNewNote(req.body, notes);
    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    noteDeleteNote(notes, req.params.id);
    res.json(notes);
 })

//
const apiRoutes = require('./apiRoutes')

//
router.use(apiRoutes);


module.exports = router;
