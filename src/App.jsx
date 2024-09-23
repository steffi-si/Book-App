import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import { ThemeContext } from "./components/ThemeContext.js";
import Layout from "./components/Layout.jsx";
import HomeView from "./views/HomeView.jsx";
import SearchView from "./views/SearchView.jsx";

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeView />} />
            <Route path="/search" element={<SearchView />} />
          </Route>
        </Routes>
      </div>
    </ThemeContext.Provider>
  )
}

export default App