const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

export default async function handler(req, res) {
    console.log(req.body)
    const { token } = req.body;
    console.log(token)
    db.get(`SELECT * FROM users WHERE token = ?`, [token.value], (err, row) => {
        console.log(row)
        if (row) {
            res.status(200).json({ message: "Token is valid" });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}