export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <div className="error-icon">!</div>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="retry-button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
