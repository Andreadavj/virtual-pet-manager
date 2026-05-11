import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MoodBadge from '../components/MoodBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteModal from '../components/DeleteModal';
import { fetchPetById, deletePet } from '../services/petService';

function PetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const response = await fetchPetById(id);
        setPet(response.data);
      } catch {
        navigate('/mascotas');
      } finally {
        setLoading(false);
      }
    };
    loadPet();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deletePet(id);
      navigate('/mascotas');
    } catch {
      alert('Error al eliminar');
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Cargando detalles..." />;
  if (!pet) return null;

  const speciesEmojis = { 'Perro':'🐶','Gato':'🐱','Conejo':'🐰','Pájaro':'🦜','Pez':'🐟','Hamster':'🐹','Tortuga':'🐢','Otro':'🐾' };
  const defaultImage = `https://placehold.co/600x400/667eea/white?text=${encodeURIComponent(pet.species)}`;

  return (
    <div className="container py-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-lg-5 mb-4 mb-lg-0">
          <div className="rounded-4 overflow-hidden shadow-sm" style={{ maxHeight: '450px' }}>
            <img
              src={pet.image || defaultImage}
              alt={pet.name}
              className="w-100 h-100"
              style={{ objectFit: 'cover', maxHeight: '450px' }}
              onError={(e) => { e.target.src = defaultImage; }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="col-lg-7">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/mascotas" className="text-decoration-none">Mascotas</Link>
              </li>
              <li className="breadcrumb-item active">{pet.name}</li>
            </ol>
          </nav>

          <div className="d-flex align-items-start gap-3 mb-3">
            <h1 className="display-5 fw-bold mb-0">
              {speciesEmojis[pet.species]} {pet.name}
            </h1>
          </div>

          <MoodBadge mood={pet.mood} />

          <hr className="my-4" />

          <div className="row g-3 mb-4">
            {[
              { label: 'Especie', value: pet.species },
              { label: 'Edad', value: `${pet.age} años` },
              { label: 'Estado de ánimo', value: pet.mood },
              { label: 'Registrada', value: new Date(pet.createdAt).toLocaleDateString('es-CL') },
            ].map(({ label, value }) => (
              <div key={label} className="col-6">
                <div className="p-3 rounded-3 bg-light">
                  <small className="text-muted d-block mb-1">{label}</small>
                  <strong>{value}</strong>
                </div>
              </div>
            ))}
          </div>

          {pet.description && (
            <div className="mb-4">
              <h6 className="fw-bold text-muted mb-2">DESCRIPCIÓN</h6>
              <p className="text-dark">{pet.description}</p>
            </div>
          )}

          {/* Acciones */}
          <div className="d-flex gap-3 flex-wrap">
            <Link to={`/editar-mascota/${pet._id}`} className="btn btn-gradient px-4">
              ✏️ Editar Mascota
            </Link>
            <button
              className="btn btn-outline-danger px-4"
              onClick={() => setShowDeleteModal(true)}
            >
              🗑️ Eliminar
            </button>
            <Link to="/mascotas" className="btn btn-outline-secondary px-4">
              ← Volver
            </Link>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          pet={pet}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={deleting}
        />
      )}
    </div>
  );
}

export default PetDetailPage;