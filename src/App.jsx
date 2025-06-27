import { useEffect, useState } from "react";
import Main from "./pages/main/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersApp from "./pages/users/users-app";
import Navbar from "./layout/navbar/navbar";
import About from "./pages/about/about";
import TodoApp from "./pages/todo-list/todo-app";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<UsersApp />} />
          <Route path="/about" element={<About user="Mussolini"/>} />
          <Route path="/todo-list" element={<TodoApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
