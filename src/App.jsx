import { useEffect, useState } from "react";
import Main from "./pages/main/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersApp from "./pages/users/users-app";
import Navbar from "./layout/navbar/navbar";
import About from "./pages/about/about";
import TodoApp from "./pages/todo-list/todo-app";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data fetched:", data);
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
          <Route
            path="/"
            element={
              <Main
                name={user ? user.name : "Loading..."}
                phone={user ? user.phone : "Not found number"}
                email={user ? user.email : "Email not found"}
              />
            }
          />
          <Route path="/users" element={<UsersApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo-list" element={<TodoApp />} />
        </Routes>
      </Router>
    </>
  );
}

