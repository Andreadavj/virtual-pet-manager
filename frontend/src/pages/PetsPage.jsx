import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import DeleteModal from '../components/DeleteModal';
import { fetchAllPets, deletePet } from '../services/petService';

const SPECIES_OPTIONS = ['Todos', 'Perro', 'Gato', 'Conejo', 'Pájaro', 'Pez', 'Hamster', 'Tortuga', 'Otro'];
const MOOD_OPTIONS = ['Todos', 'Feliz', 'Triste', 'Emocionado', 'Hambriento', 'Cansado', 'Juguetón', 'Enojado'];

// Mascotas de demostración para GitHub Pages
const DEMO_PETS = [
  {
    _id: '1',
    name: '🐕 Max',
    species: 'Perro',
    mood: 'Feliz',
    energy: 85,
    hunger: 30,
    age: 3,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: '🐈 Luna',
    species: 'Gato',
    mood: 'Tranquilo',
    energy: 45,
    hunger: 60,
    age: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: '🐰 Fluffy',
    species: 'Conejo',
    mood: 'Juguetón',
    energy: 70,
    hunger: 50,
    age: 1,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: '🦜 Tweety',
    species: 'Pájaro',
    mood: 'Emocionado',
    energy: 90,
    hunger: 40,
    age: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '5',
    name: '🐠 Nemo',
    species: 'Pez',
    mood: 'Tranquilo',
    energy: 50,
    hunger: 55,
    age: 1,
    createdAt: new Date().toISOString(),
  },
];

function PetsPage() {
  // Estado principal
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtros
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('Todos');
  const [moodFilter, setMoodFilter] = useState('Todos');
  
  // Modal de eliminación
  const [petToDelete, setPetToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Cargar mascotas al montar el componente
  useEffect(() => {
    loadPets();
  }, []); // [] = solo se ejecuta una vez al montar

  const loadPets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAllPets();
      setPets(response.data);
    } catch (err) {
      console.error('Backend no disponible, usando mascotas de demostración:', err);
      // Si no hay backend (ej: en GitHub Pages), mostrar mascotas de demostración
      setPets(DEMO_PETS);
      // NO mostrar error si logramos cargar las mascotas de demostración
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado en el frontend (sin llamar a la API)
  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesSpecies = speciesFilter === 'Todos' || pet.species === speciesFilter;
    const matchesMood = moodFilter === 'Todos' || pet.mood === moodFilter;
    return matchesSearch && matchesSpecies && matchesMood;
  });

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deletePet(petToDelete._id);
      // Actualizar estado local sin recargar la página
      setPets(prev => prev.filter(p => p._id !== petToDelete._id));
      setPetToDelete(null);
    } catch (err) {
      alert('Error al eliminar la mascota');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #7a422f 0%, #463124 100%)' }}
           className="py-5 text-white mb-5">
        <div className="container py-3">
          <h1 className="display-5 fw-bold">🐾 Todas las Mascotas</h1>
          <p className="lead opacity-75">
            {pets.length} mascota{pets.length !== 1 ? 's' : ''} registrada{pets.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="container pb-5">
        {/* Barra de búsqueda y filtros */}
        <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: '16px' }}>
          <div className="row g-3">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control form-control-modern"
                placeholder="🔍 Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-control-modern"
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              >
                {SPECIES_OPTIONS.map(s => (
                  <option key={s} value={s}>{s === 'Todos' ? '🐾 Todas las especies' : s}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-control-modern"
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
              >
                {MOOD_OPTIONS.map(m => (
                  <option key={m} value={m}>{m === 'Todos' ? '😊 Todos los estados' : m}</option>
                ))}
              </select>
            </div>
            <div className="col-md-1">
              <Link to="/crear-mascota" className="btn btn-gradient w-100 h-100 d-flex align-items-center justify-content-center">
                ✨
              </Link>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <LoadingSpinner message="Cargando mascotas..." />
        ) : error ? (
          <div className="alert alert-danger rounded-3 d-flex align-items-center gap-3">
            <span style={{ fontSize: '1.5rem' }}>❌</span>
            <div>
              <strong>¡Oops!</strong> {error}
              <button className="btn btn-sm btn-outline-danger ms-3" onClick={loadPets}>
                Reintentar
              </button>
            </div>
          </div>
        ) : filteredPets.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="Sin resultados"
            message={search ? `No se encontraron mascotas con "${search}"` : 'No hay mascotas con estos filtros'}
            actionLabel="Ver todas las mascotas"
            actionTo={null}
          />
        ) : (
          <>
            <p className="text-muted mb-4">
              Mostrando <strong>{filteredPets.length}</strong> mascota{filteredPets.length !== 1 ? 's' : ''}
            </p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {filteredPets.map(pet => (
                <div key={pet._id} className="col">
                  <PetCard
                    pet={pet}
                    onDelete={(pet) => setPetToDelete(pet)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de eliminación */}
      {petToDelete && (
        <DeleteModal
          pet={petToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPetToDelete(null)}
          isLoading={deleting}
        />
      )}
    </div>
  );
}

export default PetsPage;