function ErrorPanel({ error }) {
    return (
        <div className="error-panel">
            <p role="alert">{error}</p>
        </div>
    );
}

export default ErrorPanel;
