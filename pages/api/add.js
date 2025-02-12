import crypto from 'crypto';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)

function checkUserExists(username) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row !== undefined);
            }
        });
    });
}

export default async function handler(req, res) {
    const body = req.body;

    var salt = crypto.randomBytes(16).toString('hex');
    var saltedPassword = body.password + salt;

    var username = body.username;
    var password = crypto.createHash('sha256').update(saltedPassword).digest('hex');
    var email = body.email;

    if (await checkUserExists(username)) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    db.run(`INSERT INTO users (username, password, email, salt, token) VALUES (?, ?, ?, ?, NULL)`, [username, password, email, salt]);
    res.status(200).json({ message: "User added successfully" });
}