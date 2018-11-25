const fs = require('fs');

const fetchNotes = () =>{
    try{
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    }catch(e){
        return [];
    }
};

const saveNotes = (notes) =>{
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


const addNote = (title, body) => {
    console.log('Adding note', title, body);

    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note)=>{
        return note.title === title;
    });

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = ()=>{
     return fetchNotes();
};

const getNote = (title) =>{
    console.log('Reading note', title);
    var fetchedNotes = fetchNotes();
    var desiredNotes = fetchedNotes.filter((note)=>{
        return note.title === title;
    });

    if(desiredNotes.length > 0) {
         return desiredNotes;
     }
     else{
         return undefined;
     } 
};

const removeNote = (title) =>{
    var fetchedNotes = fetchNotes();
    var notesToKeep = fetchedNotes.filter((note)=>{
        return note.title !== title;
    });
    saveNotes(notesToKeep);

    return fetchedNotes.length !== notesToKeep.length;
};

const logNote = (title, body) =>{
            console.log("------------------------");
            console.log("Title: " + title);
            console.log("Body: " + body);
            console.log("------------------------");
};

module.exports = {
    addNote,
    getAll,
    getNote,
    fetchNotes,
    logNote,
    removeNote,
    saveNotes
};