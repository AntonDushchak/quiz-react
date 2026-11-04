import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import HomePage from "../features/settings/HomePage";
import QuizPage from "../features/quiz/QuizPage";
import ResultPage from "../features/result/ResultPage";
import LeaderboardPage from "../features/leaderboard/LeaderboardPage";
import { DEFAULT_SETTINGS } from "../features/settings/config";

function App() {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        index
                        element={<HomePage settings={settings} onSettingsChange={setSettings} />}
                    />
                    <Route path="quiz" element={<QuizPage settings={settings} />} />
                    <Route path="result" element={<ResultPage />} />
                    <Route path="leaderboard" element={<LeaderboardPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
