function LoadingSpinner({ message = 'Cargando...' }) {
  return (
    <div className="loading-container">
      <div className="text-center">
        <div
          className="spinner-border text-primary mb-3"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-muted fw-medium">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;