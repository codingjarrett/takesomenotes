# takesomenotes
This is the repository for the eleventh bootcamp challenge (Note Taker).

## Note Taker Application
This is an Express.js application that allows users to write and save notes. It uses a JSON file to store and retrieve note data.

## User Story
As a small business owner, I want to be able to write and save notes so that I can organize my thoughts and keep track of tasks I need to complete.

## Acceptance Criteria
Given a note-taking application:
*	When I open the Note Taker, I am presented with a landing page with a link to a notes page.
*	When I click on the link to the notes page, I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column.
*	When I enter a new note title and the note’s text, a Save icon appears in the navigation at the top of the page.
*	When I click on the Save icon, the new note I have entered is saved and appears in the left-hand column with the other existing notes.
*	When I click on an existing note in the list in the left-hand column, that note appears in the right-hand column.
*	When I click on the Write icon in the navigation at the top of the page, I am presented with empty fields to enter a new note title and the note’s text in the right-hand column.

## Getting Started
To get started with this application, clone the repository and install the required dependencies:
* git clone <repository-url> cd note-taker npm install 

## Usage
To start the server, run the following command:
* npm start 
* Then, navigate to http://localhost:3000 in your web browser to use the application.

## Features
This application has the following features:
*	A landing page with a link to a notes page.
*	A notes page with existing notes listed in the left-hand column and empty fields to enter a new note title and text in the right-hand column.
*	The ability to save new notes by clicking the Save icon.
*	The ability to view existing notes by clicking on them in the left-hand column.
* The ability to create a new note by clicking the Write icon.
*	The ability to delete notes (bonus feature).

## API Routes
This application has the following API routes:
*	GET /api/notes: reads the db.json file and returns all saved notes as JSON.
*	POST /api/notes: receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client.
*	DELETE /api/notes/:id: receives a query parameter containing the id of a note to delete, reads all notes from the db.json file, removes the note with the given id property, and then rewrites the notes to the db.json file.

## Technologies Used
This application uses the following technologies:
*	Node.js
*	Express.js
*	UUID

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Credits
This application was created by Jarrett Jennings.
