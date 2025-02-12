const sqlite3 = require('sqlite3').verbose();
const fs = require("fs");

if (!fs.existsSync('./db')) {
    fs.mkdirSync('./db');
}

if (!fs.existsSync('./db/users.db')) {
    fs.writeFileSync('./db/users.db', '');
}

if (!fs.existsSync('./db/images.db')) {
    fs.writeFileSync('./db/images.db', '');
}

const dba = new sqlite3.Database(
    './db/users.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the users database.');
    }
)

dba.serialize(() => {
    dba.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            email TEXT NOT NULL,
            salt TEXT,
            token TEXT,
            files TEXT
        )
    `)
})

dbb = new sqlite3.Database(
    './db/images.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the images database.');
    }
)

dbb.serialize(() => {
    dbb.run(`
        CREATE TABLE IF NOT EXISTS images (
            username TEXT NOT NULL,
            name TEXT NOT NULL,
            path TEXT NOT NULL
        )
    `)
})