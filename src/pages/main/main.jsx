import { useState } from "react";
import logo from "../../logo.svg";
import "./main.css";

export default function Main({
  name,
  phone,
  email,
  description = "Welcome to our application!",
}) {
  const [count, setCount] = useState(0);

  const greeting = `Hello, ${name}! You phone is  ${phone}. Your email is ${email}. ${description}`;

  return (
    <>
      <div className="main">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1>{greeting}</h1>
          <a
            className="link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div className="counter">
            <button className="buttonelllo" onClick={() => setCount(count + 1)}>
              Add Count
            </button>
            <span className="count">{count}</span>
            <button className="buttonelllo" onClick={() => setCount(count - 1)}>
              Reduce Count
            </button>
          </div>
        </header>
      </div>
      <div className="container"></div>
    </>
  );
}
