import Main from "./pages/main/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersApp from "./pages/users/users-app";

import About from "./pages/about/about";
import TodoApp from "./pages/todo-list/todo-app";
import { AuthLayout, MainLayout } from "./layout/layout";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";

// ====== you can write middle ware like this ======
// function LayoutWithNavbar({ children }) {
//   return (
//     <>
//       <Navbar />
//       {children}
//     </>
//   );
// }

// // Layout компонент без Navbar
// function LayoutWithoutNavbar({ children }) {
//   return <>{children}</>;
// }

export default function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* main routes with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<UsersApp />} />
            <Route path="/about" element={<About user="Mussolini" />} />
            <Route path="/todo-list" element={<TodoApp />} />
          </Route>

          {/* Auth routes without Navbar */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  );

  // ===== then you must wrap all routes separately in layout with or without nav layout =====
  // return (
  //   <Router>
  //     <Routes>
  //       {/* Маршруты с Navbar */}
  //       <Route path="/" element={<LayoutWithNavbar><Main /></LayoutWithNavbar>} />
  //       <Route path="/users" element={<LayoutWithNavbar><UsersApp /></LayoutWithNavbar>} />
  //       <Route path="/about" element={<LayoutWithNavbar><About user="Mussolini"/></LayoutWithNavbar>} />
  //       <Route path="/todo-list" element={<LayoutWithNavbar><TodoApp /></LayoutWithNavbar>} />

  //       {/* Маршруты без Navbar */}
  //       <Route path="/login" element={<LayoutWithoutNavbar><Login /></LayoutWithoutNavbar>} />
  //       <Route path="/register" element={<LayoutWithoutNavbar><Register /></LayoutWithoutNavbar>} />
  //     </Routes>
  //   </Router>
  // );
}
