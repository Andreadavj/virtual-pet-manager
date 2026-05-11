function DeleteModal({ pet, onConfirm, onCancel, isLoading }) {
  if (!pet) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
          <div className="modal-body text-center p-5">
            <div style={{ fontSize: '4rem' }} className="mb-3">⚠️</div>
            <h5 className="fw-bold mb-2">¿Eliminar a {pet.name}?</h5>
            <p className="text-muted mb-4">
              Esta acción no se puede deshacer. {pet.name} desaparecerá para siempre.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <button
                className="btn btn-outline-secondary px-4"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger px-4"
                onClick={onConfirm}
                disabled={isLoading}
              >
                {isLoading ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Eliminando...</>
                ) : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;