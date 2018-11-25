const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
        describe: 'Title of note',
        demand: true,
        alias: 't'
};

const bodyOptions = {
        describe: 'Body of the note',
        demand: true,
        alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {title: titleOptions, body: bodyOptions})
    .command('list', 'List all the notes')
    .command('read', 'Read a note', {title: titleOptions})
    .command('remove', 'Remove a note', {title: titleOptions})
    .help()
    .argv;
var command = argv._[0];


if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);

    var resultNoteAdd = note != null ? "addNote() : Note added" 
    : "addNote() Note already exists";
    console.log(resultNoteAdd);
    notes.logNote(argv.title, argv.body);
}
else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log('Printing all ' +  allNotes.length + ' Notes');
    allNotes.forEach((note) =>{
        notes.logNote(note.title, note.body);
    });
}
else if(command === 'read'){
    var getNotesResults = notes.getNote(argv.title);

    if(getNotesResults)
    {
        getNotesResults.forEach((note, index)=>{
            notes.logNote(note.title, note.body);
        });
    }
    else
    {
        console.log("Read -> No note found with that title");
    }
}
else if(command === 'remove'){
    var removedResult = notes.removeNote(argv.title);
    var resultMessage = removedResult ? "Removed note ->" : "Note not found ->";
    console.log(resultMessage + argv.title);
}
else{
    console.log('Command not recognized');
}