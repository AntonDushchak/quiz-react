import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { DEFAULT_API_VALUES } from "./constants";
import Quiz from "./Quiz";
import Home from "./Home";
import Result from "./Result";
import Leaderboard from "./Leaderboard";

function App() {
    const [settings, setSettings] = useState(DEFAULT_API_VALUES);

    return (
        <BrowserRouter>
            <nav className="app-nav">
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home setSettings={setSettings} />} />
                <Route path="/quiz" element={<Quiz settings={settings} />} />
                <Route path="/result" element={<Result />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
