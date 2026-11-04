function ErrorPanel({ message }) {
    return (
        <div className="error-panel">
            <p role="alert">{message}</p>
        </div>
    );
}

export default ErrorPanel;
