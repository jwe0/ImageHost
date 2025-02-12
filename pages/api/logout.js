const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the users database.');
});

export default async function handler(req, res) {
    const token = req.cookies.token;
    res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    db.run(`UPDATE users SET token = NULL WHERE token = ?`, [token]);
    res.status(200).json({ message: "Logout successful" });
}