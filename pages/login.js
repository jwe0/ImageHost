
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message === "Login successful") {
            document.cookie = `token=${data.token}; path=/`;
            window.location.href = "/home";
        }
    })
    .catch((error) => {
        console.error(error);
    });
}


export default function Login() {
    return (
        <div>
            <h1><u>Login</u></h1>
            <input type="text" placeholder="Username" id="username"/><br></br>
            <input type="password" placeholder="Password" id="password"/><br></br>
            <button onClick={login}>Submit</button>
        </div>
    );
}