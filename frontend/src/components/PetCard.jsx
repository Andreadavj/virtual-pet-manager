import { Link } from 'react-router-dom';
import MoodBadge from './MoodBadge';

function PetCard({ pet, onDelete }) {
  const speciesEmojis = {
    'Perro': '🐶', 'Gato': '🐱', 'Conejo': '🐰',
    'Pájaro': '🦜', 'Pez': '🐟', 'Hamster': '🐹',
    'Tortuga': '🐢', 'Otro': '🐾'
  };

  const defaultImage = `https://placehold.co/400x300/667eea/white?text=${encodeURIComponent(pet.species)}`;

  return (
    <div className="pet-card card h-100">
      {/* Imagen con overflow hidden para el zoom en hover */}
      <div className="pet-image-wrapper">
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
            className="btn btn-outline-primary btn-sm flex-grow-1"
          >
            Ver detalles
          </Link>
          <Link
            to={`/editar-mascota/${pet._id}`}
            className="btn btn-outline-warning btn-sm"
          >
            ✏️
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
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