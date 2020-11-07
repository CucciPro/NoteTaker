const router = require("express").Router();
const notes = require('../public/assets/js/notes');

router.get("/notes", (req, res) => {
    notes.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    notes.addNote(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});


router.delete("/notes/:id", (req, res) => {
    notes.remove(req.params.id)
        .then(() => res.json({ok: true}))
        .catch(err => res.status(500).json(err));
});

module.exports = router;