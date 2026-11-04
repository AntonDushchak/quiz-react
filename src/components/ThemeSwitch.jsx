import { useTheme } from "../hooks/useTheme";
import Button from "./Button";

function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return <Button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"} Mode</Button>;
}

export default ThemeSwitch;
