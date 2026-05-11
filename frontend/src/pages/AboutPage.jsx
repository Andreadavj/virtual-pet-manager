import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="hero-gradient text-white py-5" style={{ minHeight: '50vh' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="hero-title mb-4">
                Acerca de Mascotas Virtuales ✨
              </h1>
              <p className="hero-subtitle">
                Descubre la historia detrás de la plataforma más moderna para gestionar mascotas virtuales.
              </p>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block">
              <div style={{ fontSize: '6rem' }}>🐾</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sección: Misión ── */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center gap-4">
            <div className="col-lg-6">
              <h2 className="mb-4" style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold' }}>
                Nuestra Misión 🎯
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: 1.8 }}>
                En Mascotas Virtuales, creemos que la gestión de mascotas virtuales debe ser
                <strong> simple, divertida y accesible para todos</strong>. Nuestro objetivo es crear
                una plataforma intuitiva donde puedas cuidar, conectar y disfrutar de tus mascotas virtuales.
              </p>
              <p style={{ fontSize: '1.1rem', color: '#4a5568', lineHeight: 1.8 }}>
                Buscamos revolucionar la forma en que interactúas con tus mascotas digitales, proporcionando
                herramientas modernas y una experiencia delightful en cada clic.
              </p>
            </div>
            <div className="col-lg-6 text-center">
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🚀</div>
              <div style={{ fontSize: '5rem' }}>💡</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sección: Valores ── */}
      <section className="py-5" style={{ backgroundColor: '#f7fafc' }}>
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold' }}>
            Nuestros Valores 💎
          </h2>
          <div className="row g-4">
            {[
              {
                icon: '🎨',
                title: 'Diseño Elegante',
                desc: 'Interfaces limpias, modernas y atractivas que hacen la experiencia memorable.'
              },
              {
                icon: '⚡',
                title: 'Rendimiento',
                desc: 'Una plataforma rápida y responsiva que funciona perfectamente en cualquier dispositivo.'
              },
              {
                icon: '🔒',
                title: 'Seguridad',
                desc: 'Tus datos están protegidos con los más altos estándares de seguridad.'
              },
              {
                icon: '🤝',
                title: 'Comunidad',
                desc: 'Un espacio donde los amantes de mascotas virtuales se conectan y comparten.'
              },
            ].map((value, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div
                  className="p-4 h-100 rounded-lg"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{value.icon}</div>
                  <h4 style={{ color: '#2d3748', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {value.title}
                  </h4>
                  <p style={{ color: '#718096', fontSize: '0.95rem' }}>{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sección: Equipo ── */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#2d3748', fontSize: '2.5rem', fontWeight: 'bold' }}>
            Nuestro Equipo 👥
          </h2>
          <div className="row g-4 justify-content-center">
            {[
              { role: 'Founder & CEO', emoji: '👨‍💼' },
              { role: 'Lead Developer', emoji: '👩‍💻' },
              { role: 'Designer', emoji: '👨‍🎨' },
              { role: 'Community Manager', emoji: '👩‍💼' },
            ].map((member, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div
                  className="p-4 text-center rounded-lg"
                  style={{
                    backgroundColor: '#f7fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{member.emoji}</div>
                  <p style={{ color: '#718096', fontWeight: 'bold' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sección: CTA ── */}
      <section className="hero-gradient text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            ¿Listo para comenzar? 🚀
          </h2>
          <p className="mb-5" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Únete a miles de usuarios disfrutando de sus mascotas virtuales
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/crear-mascota" className="btn btn-light btn-lg px-5 fw-bold text-primary">
              Crear Mi Primera Mascota
            </Link>
            <Link to="/contacto" className="btn btn-outline-light btn-lg px-5">
              Contactar Soporte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
