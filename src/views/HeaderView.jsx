import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext.js";

export default function HeaderView() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/search">Search</NavLink>
            </nav>
            <button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </header>
    );
}