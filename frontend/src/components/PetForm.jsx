
import { useState } from 'react';

const SPECIES_OPTIONS = ['Perro', 'Gato', 'Conejo', 'Pájaro', 'Pez', 'Hamster', 'Tortuga', 'Otro'];
const MOOD_OPTIONS = ['Feliz', 'Triste', 'Emocionado', 'Hambriento', 'Cansado', 'Juguetón', 'Enojado'];

// initialData permite relllenar el formulario al editar
function PetForm({ onSubmit, initialData = {}, isLoading = false, submitLabel = 'Guardar' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    species: initialData.species || '',
    mood: initialData.mood || 'Feliz',
    age: initialData.age || '',
    image: initialData.image || '',
    description: initialData.description || '',
  });

  const [errors, setErrors] = useState({});

  // Validación en el frontend (antes de enviar al backend)
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (formData.name.trim().length < 2) newErrors.name = 'Mínimo 2 caracteres';
    if (!formData.species) newErrors.species = 'Selecciona una especie';
    if (!formData.mood) newErrors.mood = 'Selecciona un estado de ánimo';
    if (!formData.age) newErrors.age = 'La edad es obligatoria';
    if (formData.age < 0 || formData.age > 100) newErrors.age = 'Edad entre 0 y 100 años';
    return newErrors;
  };

  // Manejo genérico de cambios — funciona para cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el reload de página
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Pasamos los datos al componente padre
    onSubmit({ ...formData, age: Number(formData.age) });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-4">
        {/* Nombre */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Nombre de la mascota <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            className={`form-control form-control-modern ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Ej: Luna, Max, Pelusa..."
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Especie */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Especie <span className="text-danger">*</span>
          </label>
          <select
            name="species"
            className={`form-select form-control-modern ${errors.species ? 'is-invalid' : ''}`}
            value={formData.species}
            onChange={handleChange}
          >
            <option value="">Selecciona una especie...</option>
            {SPECIES_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.species && <div className="invalid-feedback">{errors.species}</div>}
        </div>

        {/* Estado de ánimo */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Estado de ánimo <span className="text-danger">*</span>
          </label>
          <select
            name="mood"
            className={`form-select form-control-modern ${errors.mood ? 'is-invalid' : ''}`}
            value={formData.mood}
            onChange={handleChange}
          >
            {MOOD_OPTIONS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errors.mood && <div className="invalid-feedback">{errors.mood}</div>}
        </div>

        {/* Edad */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Edad (años) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="age"
            className={`form-control form-control-modern ${errors.age ? 'is-invalid' : ''}`}
            placeholder="Ej: 3"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="100"
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        {/* URL de imagen */}
        <div className="col-12">
          <label className="form-label fw-semibold">URL de imagen (opcional)</label>
          <input
            type="url"
            name="image"
            className="form-control form-control-modern"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={formData.image}
            onChange={handleChange}
          />
          <div className="form-text">
            Deja en blanco para usar imagen por defecto según la especie
          </div>
        </div>

        {/* Descripción */}
        <div className="col-12">
          <label className="form-label fw-semibold">Descripción (opcional)</label>
          <textarea
            name="description"
            className="form-control form-control-modern"
            placeholder="Cuéntanos sobre tu mascota..."
            value={formData.description}
            onChange={handleChange}
            rows={3}
            maxLength={300}
          />
          <div className="form-text text-end">
            {formData.description.length}/300 caracteres
          </div>
        </div>

        {/* Botón submit */}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-gradient px-5 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Guardando...
              </>
            ) : (
              `✨ ${submitLabel}`
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PetForm;