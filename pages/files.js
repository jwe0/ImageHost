import { useEffect, useState } from "react";

export default function Files() {
    const [ files, setFiles ] = useState([]);

    useEffect(() => {
        fetch('/api/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setFiles(data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className="info">
            <h1><u>Files</u></h1>
            <ul>
                {files.map((file) => (
                    <a href={file.path}>
                        <ul>{file.name}</ul>
                    </a>
                ))}
            </ul>
        </div>
    )
}