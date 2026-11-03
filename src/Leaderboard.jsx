import useStorage from "./hooks/useStorage";
function Leaderboard() {
    const { results } = useStorage();

    return (
        <section className="standings">
            <div className="results-table">
                {results
                    .toSorted((a, b) => b.score - a.score)
                    .map((r) => (
                        <div key={r.date} className="result-row">
                            <p className="result-date">{new Date(r.date).toLocaleDateString()}</p>
                            <p className="result-score">{r.score}</p>
                        </div>
                    ))}
            </div>
        </section>
    );
}

export default Leaderboard;
