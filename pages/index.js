import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <main>
        <h1>Welcome</h1>
        <a href="/signup">Sign up</a><br></br>
        <a href="/login">Login</a>
      </main>
    </div>
  );
}