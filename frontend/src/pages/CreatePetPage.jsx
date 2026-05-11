import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm';
import { createPet } from '../services/petService';

function CreatePetPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createPet(formData);
      setSuccess(true);
      // Redirigir al detalle de la mascota creada
      setTimeout(() => {
        navigate(`/mascotas/${response.data._id}`);
      }, 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al crear la mascota';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/mascotas" className="text-decoration-none">Mascotas</a>
              </li>
              <li className="breadcrumb-item active">Crear nueva</li>
            </ol>
          </nav>

          <div className="card border-0 shadow-sm p-4 p-md-5" style={{ borderRadius: '20px' }}>
            {/* Header */}
            <div className="mb-4">
              <h2 className="fw-bold">✨ Registrar Nueva Mascota</h2>
              <p className="text-muted">Completa el formulario para agregar tu mascota virtual</p>
            </div>

            {/* Alerts */}
            {success && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-4">
                <span>✅</span>
                <strong>¡Mascota creada exitosamente! Redirigiendo...</strong>
              </div>
            )}
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-4">
                <span>❌</span>
                {error}
              </div>
            )}

            <PetForm
              onSubmit={handleSubmit}
              isLoading={loading}
              submitLabel="Crear Mascota"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePetPage;