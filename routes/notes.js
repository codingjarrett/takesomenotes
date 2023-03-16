// Import node modules 
const router = require('express').Router();
const fs = require('fs');
const notes = require('../db/db.json');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const notesDb = './db/db.json'
let counter = 0;

// retrieve all notes
router.get('/', (req, res) => {
    readFileAsync(notesDb)
    .then(data => {
        res.json(JSON.parse(data));
    });
});

// save a note
router.post('/', (req, res) => {
    console.log(`${req.method} request recieved to add a note`);

    if (req.body) {

        fs.readFile(notesDb, 'utf8', (error, data) => {
            if (error) {
                console.log(error);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push({id: counter, title: req.body.title, text: req.body.text});
                fs.writeFile(notesDb, JSON.stringify(parsedData), (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Successfully added to database');
                    }
                });
            };
        });

        counter++;
        res.json(notes);
        window.location.reload();
    } else {
        res.error('Error adding note to database');
    };
});

// delete a note
router.delete('/:id', (req, res) => {
    console.log(`${req.method} request recieved`);
    fs.readFile(notesDb, 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const results = JSON.parse(data).filter(note => note.id != req.params.id)

            fs.writeFile(notesDb, JSON.stringify(results), (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Successfully deleted from database');
                }
            });
        };
    });

    res.json(notes);

});

module.exports = router;