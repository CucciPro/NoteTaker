const router = require("express").Router();
const fs = require("fs")
const { v4: uuid } = require('uuid')
const path = require("path")

let old = JSON.parse(fs.readFileSync(path.join(__dirname,"../db/db.json")))

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

router.post("/notes", (req, res) => {
    let note = {
        id:uuid(),
        title:req.body.title,
        text:req.body.text
    };
    old.push(note)
    fs.writeFileSync("./db/db.json",JSON.stringify(old))
    res.json(old)
});

module.exports = router;