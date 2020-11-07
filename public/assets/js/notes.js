const util = require("util");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


class Notes {
    constructor() {
        this.id = 0;
    }
    
    read() {
        return readFile("db/db.json", "utf8");

    }
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read()
        .then((notes) => {
          let notesArray;
          
          try {
            notesArray = [].concat(JSON.parse(notes));
          } catch (err) {
            notesArray = [];
          }
    
          return notesArray;
        });
    }

    addNote(note) {
        const { title, text } = note;

        const newNote = { title, text, id: this.id ++ }
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updateNotes) => this.write(updateNotes))
            .then(() => newNote);
    }
    
    remove(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== parseInt(id)))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Notes();