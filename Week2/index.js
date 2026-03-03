// Week 2 - Web Applications
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("identifier.sqlite", (err) => {
    if(!err){
        console.log("DB opened successfully");
        console.log(db);
    }
    else{
        console.log(error);
        console.log(db);
    }
});

db.all("SELECT * FROM users", (err, rows) => {
    if(!err){
        console.log(rows);
    }
    else{
        console.log(err);
    }
})
