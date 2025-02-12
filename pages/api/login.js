import crypto from 'crypto';
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)

export default async function handler(req, res) {
    const body = req.body;

    const username = body.username;
    const password = body.password;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (row) {
            var salt = row.salt;
            var saltedPassword = password + salt;
            var hashedPassword = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        }

        if (row.password === hashedPassword) {
            var token_ = crypto.randomBytes(16).toString('hex');
            var token = crypto.createHash('sha256').update(token_ + hashedPassword + salt).digest('hex');
            db.run(`UPDATE users SET token = ? WHERE username = ?`, [token, username]);
            res.setHeader('Set-Cookie', `token=${token}`);
            res.status(200).json({ 
                message: "Login successful",
                token: token
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    });
}