"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "./page.css";

export default function Home() {
  const router = useRouter();

  const redirectToLoginPage = () => router.push("/auth/login");
  const redirectToSignupPage = () => router.push("/auth/signup");
  const redirectToPlanningPage = () => router.push("/trip/");

  return (
    <html>
      <head>
        <style jsx>{`
          body {
            font-family: 'Baloo Bhai', cursive;
            margin: 0px;
            padding: 0px;
          }
          `}
        </style>
      </head>
      <body>
        <header>
          <div className="left">
            <Image src="/Images/logo3.png" alt="Logo" width={100} height={50} className="img" />
          </div>
          <div className="right">
            <button className="btn1" onClick={redirectToLoginPage}>
              Log in
            </button>
            <button className="btn2" onClick={redirectToSignupPage}>
              Sign Up
            </button>
          </div>
          <div className="mid">
            <ul className="navbar">
              <li><a href="#">Home</a></li>
              <li><a href="/travel_guides/">Travel Guides</a></li>
              <li><a href="/hotel">Hotels</a></li>
            </ul>
          </div>
          <div className="search">
            <input type="text" name="search" id="search" placeholder="Explore by destination" />
          </div>
        </header>
      
        <div className="container">
            <h1>You'll never travel without our trip planner again!</h1>
            <h2>Build, organize, and map your itineraries for vacations and road trips.</h2>
            <button className="btn3" onClick={redirectToPlanningPage}>
            Start Planning
            </button>
            <button className="btn4">Get App</button>
        </div>
      </body>
    </html>
  );
}
