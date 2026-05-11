import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchAllPets } from '../services/petService';

function DashboardPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAllPets();
        setPets(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Calcular estadísticas
  const stats = {
    total: pets.length,
    happy: pets.filter(p => p.mood === 'Feliz').length,
    species: [...new Set(pets.map(p => p.species))].length,
    newest: pets[0]?.name || 'N/A',
  };

  const moodCounts = pets.reduce((acc, pet) => {
    acc[pet.mood] = (acc[pet.mood] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { icon: '🐾', label: 'Total Mascotas', value: stats.total, color: '#7a422f' },
    { icon: '😄', label: 'Mascotas Felices', value: stats.happy, color: '#b87d20' },
    { icon: '🦎', label: 'Especies Distintas', value: stats.species, color: '#bc9276' },
    { icon: '⭐', label: 'Última Registrada', value: stats.newest, color: '#463124', small: true },
  ];

  if (loading) return <LoadingSpinner message="Cargando dashboard..." />;

  return (
    <div className="container-fluid py-4 px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-1">📊 Dashboard</h1>
          <p className="text-muted mb-0">Resumen general de tus mascotas virtuales</p>
        </div>
        <Link to="/crear-mascota" className="btn btn-gradient px-4">
          ✨ Nueva Mascota
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {statCards.map((stat, i) => (
          <div key={i} className="col-sm-6 col-xl-3">
            <div className="stat-card card p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small fw-semibold mb-1 text-uppercase" style={{ letterSpacing: '0.05em' }}>
                    {stat.label}
                  </p>
                  <h3 className={`fw-bold mb-0 ${stat.small ? 'h5' : 'display-6'}`}>
                    {stat.value}
                  </h3>
                </div>
                <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                  <span>{stat.icon}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado de ánimo breakdown */}
      <div className="row g-4 mb-5">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '16px' }}>
            <h6 className="fw-bold mb-4">😊 Estados de Ánimo</h6>
            {Object.entries(moodCounts).length === 0 ? (
              <p className="text-muted text-center py-4">Sin datos aún</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {Object.entries(moodCounts).map(([mood, count]) => (
                  <div key={mood}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="fw-semibold">{mood}</small>
                      <small className="text-muted">{count} mascota{count !== 1 ? 's' : ''}</small>
                    </div>
                    <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${(count / pets.length) * 100}%`,
                          background: 'linear-gradient(135deg, #7a422f 0%, #463124 100%)',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mascotas recientes */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '16px' }}>
            <div className="d-flex justify-content-between mb-4">
              <h6 className="fw-bold mb-0">🕐 Mascotas Recientes</h6>
              <Link to="/mascotas" className="btn btn-sm btn-outline-primary">Ver todas</Link>
            </div>
            {pets.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted">No hay mascotas aún</p>
                <Link to="/crear-mascota" className="btn btn-gradient btn-sm">Crear primera mascota</Link>
              </div>
            ) : (
              <div className="row g-3">
                {pets.slice(0, 3).map(pet => (
                  <div key={pet._id} className="col-md-4">
                    <PetCard pet={pet} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;