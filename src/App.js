import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Index from "./Pages/index";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Logup from "./Pages/logup";
import Admin from "./Pages/admin";

function App() {
  const pages = [
    {
      path: "/",
      element: Index,
    },
    {
      path: "/home",
      element: Home,
    },
    {
      path: "/login",
      element: Login,
    },
    {
      path: "/logup",
      element: Logup,
    },
    {
      path: "/admin",
      element: Admin,
    },
  ];

  return (
    <CartProvider>
      <div className="Aplicacion">
        <Routes>
          {pages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<page.element />}
            />
          ))}
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
