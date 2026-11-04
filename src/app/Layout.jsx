import { Link, Outlet } from "react-router";
import ThemeSwitch from "../components/ThemeSwitch";

function Layout() {
    return (
        <>
            <nav className="app-nav">
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <ThemeSwitch />
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;
