import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function isloggedIn() {
  const token = getCookie("token");
  if (token) {
    fetch('/api/checktoken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.message === "Token is valid") {
          setCookie("token", token);  
          window.location.href = "/home";
        }
      })
  } else {
    console.log("No token found.");
  }
}


export default function Home() {
  useEffect(() => {
    isloggedIn()
  }, []);
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <main>
        <h1><u>Home</u></h1>
        <a href="/signup">Sign up</a><br></br>
        <a href="/login">Login</a>
      </main>
    </div>
  );
}