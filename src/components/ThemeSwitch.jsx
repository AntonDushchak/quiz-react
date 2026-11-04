import { useState, useEffect } from "react";
import Button from "./Button";
function ThemeSwitch() {
    const [theme, setTheme] = useState(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return <Button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"} Mode</Button>;
}

export default ThemeSwitch;
