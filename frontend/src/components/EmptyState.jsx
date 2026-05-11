import { Link } from 'react-router-dom';

function EmptyState({
  icon = '🐾',
  title = 'No hay mascotas aún',
  message = 'Comienza agregando tu primera mascota virtual',
  actionLabel = 'Agregar Mascota',
  actionTo = '/crear-mascota',
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon mb-4">{icon}</div>
      <h4 className="fw-bold text-dark mb-2">{title}</h4>
      <p className="text-muted mb-4">{message}</p>
      {actionTo && (
        <Link to={actionTo} className="btn btn-gradient px-4">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;