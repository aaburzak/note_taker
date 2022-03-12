const fs = require ('fs');
const path = require ('path');
const express = require ('express');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

//middleware to parse incoming  
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));


//HTML call for the notes page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//API route that retrieves saved notes and joins it in db.json
app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './db/db.json'))
});

//posts new notes to db.json
app.post('/api/notes', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const addNote = req.body;
    addNote.id = uuid.v1();
    notes.push(addNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes);
});

//deletes notes from db.json
app.delete ('/api/notes/:id', (req, res) => {
    let deleteId = req.params.id;
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newDb = notes.filter(note => note.id !== deleteId);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
    res.json(newDb);
    console.log('Req.params:', deleteId);
});

//HTML call for the homepage
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//listens and the dedicated PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});