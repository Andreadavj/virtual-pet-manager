import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPets } from '../services/petService';
import PetCard from '../components/PetCard';

function HomePage() {
  const [featuredPets, setFeaturedPets] = useState([]);

  useEffect(() => {
    fetchAllPets().then(res => setFeaturedPets(res.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="hero-gradient text-white" style={{ minHeight: '100vh' }}>
        <div className="container py-5">
          <div className="row align-items-center" style={{ minHeight: '90vh' }}>
            <div className="col-lg-6 py-5">
              <span className="badge bg-white text-primary fw-semibold px-3 py-2 mb-4 rounded-pill">
                🚀 Plataforma de Mascotas Virtuales
              </span>
              <h1 className="hero-title mb-4">
                Gestiona tus<br />
                <span style={{ opacity: 0.85 }}>mascotas virtuales</span><br />
                con estilo ✨
              </h1>
              <p className="hero-subtitle mb-5">
                La plataforma más moderna para administrar y hacer seguimiento
                de tus mascotas virtuales. Diseñada para ser simple, elegante y potente.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/crear-mascota" className="btn btn-light btn-lg px-5 fw-bold text-primary">
                  Comenzar gratis →
                </Link>
                <Link to="/mascotas" className="btn btn-outline-light btn-lg px-5">
                  Ver mascotas
                </Link>
              </div>
            </div>

            {/* Stats flotantes */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <div className="text-center">
                <div style={{ fontSize: '10rem', lineHeight: 1 }}>🐾</div>
                <div className="d-flex justify-content-center gap-4 mt-4">
                  {[
                    { value: '100%', label: 'Gratis' },
                    { value: '∞', label: 'Mascotas' },
                    { value: '24/7', label: 'Disponible' },
                  ].map(s => (
                    <div key={s.label} className="text-center bg-white bg-opacity-10 rounded-3 px-3 py-2">
                      <div className="h3 fw-bold mb-0">{s.value}</div>
                      <small className="opacity-75">{s.label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-6 bg-white" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">¿Por qué PetManager?</h2>
            <div className="section-divider"></div>
          </div>
          <div className="row g-4">
            {[
              { icon: '⚡', title: 'Ultra rápido', desc: 'Gestiona tus mascotas en segundos con nuestra interfaz optimizada.' },
              { icon: '🎨', title: 'Diseño moderno', desc: 'Una experiencia visual cuidada al detalle, responsive en todos los dispositivos.' },
              { icon: '🔒', title: 'Datos seguros', desc: 'Tus datos almacenados de forma segura en tu base de datos local.' },
              { icon: '📊', title: 'Dashboard completo', desc: 'Visualiza estadísticas y el estado de tus mascotas de un vistazo.' },
            ].map(f => (
              <div key={f.title} className="col-md-6 col-lg-3">
                <div className="text-center p-4">
                  <div style={{ fontSize: '3rem' }} className="mb-3">{f.icon}</div>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mascotas Destacadas ── */}
      {featuredPets.length > 0 && (
        <section className="py-5" style={{ background: '#f8f9ff' }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title">Mascotas Destacadas</h2>
              <div className="section-divider"></div>
            </div>
            <div className="row g-4 justify-content-center">
              {featuredPets.map(pet => (
                <div key={pet._id} className="col-md-4">
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link to="/mascotas" className="btn btn-gradient btn-lg px-5">
                Ver todas las mascotas →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonios ── */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Lo que dicen nuestros usuarios</h2>
            <div className="section-divider"></div>
          </div>
          <div className="row g-4">
            {[
              { name: 'Ana García', role: 'Desarrolladora Junior', text: 'PetManager me ayudó a aprender Full Stack de forma práctica. ¡Lo mejor!', avatar: '👩‍💻' },
              { name: 'Carlos López', role: 'Estudiante de programación', text: 'La mejor app para practicar React y Node.js. Código limpio y profesional.', avatar: '👨‍🎓' },
              { name: 'María Torres', role: 'UX Designer', text: 'El diseño es increíble. Moderno, limpio y muy intuitivo de usar.', avatar: '👩‍🎨' },
            ].map(t => (
              <div key={t.name} className="col-md-4">
                <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: '16px' }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div style={{ fontSize: '2.5rem' }}>{t.avatar}</div>
                    <div>
                      <strong className="d-block">{t.name}</strong>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>
                  <p className="text-muted mb-3">"{t.text}"</p>
                  <div className="text-warning">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '5rem 0' }}>
        <div className="container text-center text-white">
          <h2 className="display-5 fw-bold mb-3">¿Listo para comenzar?</h2>
          <p className="lead opacity-75 mb-4">Registra tu primera mascota virtual hoy mismo</p>
          <Link to="/crear-mascota" className="btn btn-light btn-lg px-5 fw-bold text-primary">
            ✨ Crear primera mascota
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-dark py-4">
        <div className="container text-center">
          <p className="mb-0 opacity-75">
            🐾 PetManager © 2025 — Proyecto Full Stack con React + Express + MongoDB
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;