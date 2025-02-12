
function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    fetch("/api/add", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message === "User added successfully") {
            window.location.href = "/login";
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

export default function Signup() {
    return (
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="Username" id="username"/><br></br>
            <input type="password" placeholder="Password" id="password"/><br></br>
            <input type="email" placeholder="Email" id="email"/><br></br>
            <button onClick={signup}>Submit</button>
        </div>
    );
}