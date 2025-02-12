import { useEffect, useState } from "react";

function logout() {
    fetch("/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message === "Logout successful") {
            window.location.href = "/login";
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

export default function Home() {
    const [userInfo, setUserInfo] = useState({ username: "", email: "" });

    useEffect(() => {
        fetch("/api/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUserInfo({
                username: data.username,
                email: data.email,
            });
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <div className="info">
            <h1><u>Home</u></h1>
            <p>Username: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <a href="upload_image">Upload Image</a><br />
            <a href="files">View files</a><br />
            <button onClick={logout}>Logout</button>
        </div>
    );
}
