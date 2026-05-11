import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchPetById, updatePet } from '../services/petService';

function EditPetPage() {
  const { id } = useParams(); // extrae el :id de la URL
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPet = async () => {
      try {
        const response = await fetchPetById(id);
        setPet(response.data);
      } catch {
        setError('No se pudo cargar la mascota');
      } finally {
        setLoading(false);
      }
    };
    loadPet();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      await updatePet(id, formData);
      navigate(`/mascotas/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar');
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Cargando mascota..." />;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 p-md-5" style={{ borderRadius: '20px' }}>
            <h2 className="fw-bold mb-1">✏️ Editar Mascota</h2>
            <p className="text-muted mb-4">Modificando: <strong>{pet?.name}</strong></p>

            {error && (
              <div className="alert alert-danger mb-4">❌ {error}</div>
            )}

            {pet && (
              <PetForm
                initialData={pet}
                onSubmit={handleSubmit}
                isLoading={saving}
                submitLabel="Guardar Cambios"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPetPage;