export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    }
}

const sqlite3 = require('sqlite3').verbose();
const fs = require("fs");
const db = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

export default async function handler(req, res) {
    console.log(req.cookies)
    const token = req.cookies.token;

    db.get(`SELECT * FROM users WHERE token = ?`, [token], (err, row) => {
        if (row) {
            const username = row.username;


            if (req.method === "POST") {
                const { name: filename, content: fileContent } = req.body;

                const file = fileContent;
                if (!fs.existsSync('./public/images')) {
                    fs.mkdirSync('./public/images');
                }
                if (!fs.existsSync(`./public/images/${username}`)) {
                    fs.mkdirSync(`./public/images/${username}`);
                }
                const buffer = Buffer.from(file, 'base64');
                fs.writeFileSync(`./public/images/${username}/${filename}`, buffer);

                db.close();

                const db2 = new sqlite3.Database('./db/images.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Connected to the images database.');
                });
                db2.run(`INSERT INTO images (username, name, path) VALUES (?, ?, ?)`, [username, filename, `/images/${username}/${filename}`]);
                
                res.status(200).json({ message: "Image uploaded successfully", path: `/images/${username}/${filename}` });
            }
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    });
}