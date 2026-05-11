import { Link } from 'react-router-dom';
import MoodBadge from './MoodBadge';

function PetCard({ pet, onDelete }) {
  const speciesEmojis = {
    'Perro': '🐶', 'Gato': '🐱', 'Conejo': '🐰',
    'Pájaro': '🦜', 'Pez': '🐟', 'Hamster': '🐹',
    'Tortuga': '🐢', 'Otro': '🐾'
  };

  // Paleta de macarrones vibrantes
  const colorPalette = {
    'Perro': '#a8e6cf',      // Verde menta
    'Gato': '#5f27cd',       // Púrpura
    'Conejo': '#ff6b81',     // Coral/rosa
    'Pájaro': '#feca57',     // Amarillo
    'Pez': '#98d9e1',        // Turquesa
    'Hamster': '#a8e6cf',    // Verde menta
    'Tortuga': '#5f27cd',    // Púrpura
    'Otro': '#ff6b81'        // Coral/rosa
  };

  const petColor = colorPalette[pet.species] || '#a8e6cf';
  const defaultImage = `https://placehold.co/400x300/${petColor.slice(1)}/white?text=${encodeURIComponent(pet.species)}`;

  return (
    <div className="pet-card card h-100" style={{ borderTop: `4px solid ${petColor}` }}>
      {/* Imagen con overflow hidden para el zoom en hover */}
      <div className="pet-image-wrapper" style={{ background: `${petColor}20` }}>
        <img
          src={pet.image || defaultImage}
          className="card-img-top w-100 h-100"
          alt={pet.name}
          style={{ objectFit: 'cover' }}
          onError={(e) => { e.target.src = defaultImage; }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        {/* Header de la card */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0">
            {speciesEmojis[pet.species] || '🐾'} {pet.name}
          </h5>
          <MoodBadge mood={pet.mood} />
        </div>

        {/* Info */}
        <div className="d-flex gap-3 mb-3">
          <small className="text-muted">
            <span className="fw-semibold">Especie:</span> {pet.species}
          </small>
          <small className="text-muted">
            <span className="fw-semibold">Edad:</span> {pet.age} años
          </small>
        </div>

        {/* Descripción */}
        {pet.description && (
          <p className="card-text text-muted small flex-grow-1" style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {pet.description}
          </p>
        )}

        {/* Botones */}
        <div className="d-flex gap-2 mt-auto pt-3">
          <Link
            to={`/mascotas/${pet._id}`}
            className="btn btn-sm flex-grow-1 fw-semibold"
            style={{ background: `${petColor}30`, color: petColor, border: `2px solid ${petColor}` }}
          >
            Ver detalles
          </Link>
          <Link
            to={`/editar-mascota/${pet._id}`}
            className="btn btn-sm fw-semibold"
            style={{ background: `${petColor}30`, color: petColor, border: `2px solid ${petColor}` }}
          >
            ✏️
          </Link>
          <button
            className="btn btn-sm fw-semibold"
            style={{ background: `${petColor}30`, color: petColor, border: `2px solid ${petColor}` }}
            onClick={() => onDelete && onDelete(pet)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetCard;