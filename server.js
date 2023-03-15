const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET Route for retrieving all the notes
app.get('/api/notes', (req,res) => {
    readFileAsync('./db/db.json').then(data => {
        let dbNotes = JSON.parse(data);
        res.json(dbNotes);
    })
});

// POST Route for saving a note
app.post('/api/notes', (req,res) => {
    // Log that a POST request was received
    console.info(`${req.method} request recieved to add a note`);

    if (req.body) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: new Date(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (error) {
                console.log(error);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData), (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.info(`Note saved to db.json`);
                    };
                });
            };
        });

        res.json(notes);
    } else {
        res.error('Error in adding note');
    };
});

// DELETE Route for deleting a note
app.delete('/api/notes/:id', (req, res) => {
    // Log that a DELETE request was received
    console.info(`${req.method} request recieved to delete a note`);
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const parsedData = JSON.parse(data);
            const results = parsedData.filter(note => note.id != req.params.id)

            fs.writeFile('./db/db.json', JSON.stringify(results), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.info(`Note deleted from db.json`)
                }
            });
        };
    });

    res.json(notes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
