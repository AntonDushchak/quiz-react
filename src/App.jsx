import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { DEFAULT_API_VALUES } from "./features/settings/config";
import Quiz from "./features/quiz/QuizPage";
import Home from "./features/settings/HomePage";
import Result from "./features/result/ResultPage";
import Leaderboard from "./features/leaderboards/LeaderboardPage";
import ThemeSwitch from "./components/ThemeSwitch";

function App() {
    const [settings, setSettings] = useState(DEFAULT_API_VALUES);

    return (
        <BrowserRouter>
            <nav className="app-nav">
                <Link to="/">Home</Link>
                <Link to="/leaderboard">Leaderboard</Link>
                <ThemeSwitch />
            </nav>

            <Routes>
                <Route path="/" element={<Home settings={settings} setSettings={setSettings} />} />
                <Route path="/quiz" element={<Quiz settings={settings} />} />
                <Route path="/result" element={<Result />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
