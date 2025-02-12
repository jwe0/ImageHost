const sqlite3 = require('sqlite3').verbose();
const img_db = new sqlite3.Database('./db/images.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the images database.');
})

const user_db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
})

export default async function handler(req, res) {
    const token = req.cookies.token;

    user_db.get(`SELECT * FROM users WHERE token = ?`, [token], (err, row) => {
        if (row) {
            const username = row.username;
            img_db.all(`SELECT * FROM images WHERE username = ?`, [username], (err, rows) => {
                if (err) {
                    console.error(err.message);
                }
                res.status(200).json(rows);
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}