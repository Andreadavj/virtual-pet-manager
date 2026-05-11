import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5 mt-5" style={{ marginTop: 'auto' }}>
      <div className="container">
        <div className="row g-4 mb-4">
          {/* ── Columna: Acerca de ── */}
          <div className="col-md-6 col-lg-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span style={{ fontSize: '1.8rem' }}>🐾</span>
              <h5 className="mb-0 fw-bold">PetManager</h5>
            </div>
            <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
              La plataforma moderna para gestionar tus mascotas virtuales con estilo y facilidad.
            </p>
          </div>

          {/* ── Columna: Productos ── */}
          <div className="col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Producto</h6>
            <ul className="list-unstyled" style={{ opacity: 0.8 }}>
              <li className="mb-2">
                <Link to="/mascotas" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Mascotas
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/crear-mascota" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Crear Mascota
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Columna: Compañía ── */}
          <div className="col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Compañía</h6>
            <ul className="list-unstyled" style={{ opacity: 0.8 }}>
              <li className="mb-2">
                <Link to="/acerca-de" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Acerca de
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Contacto
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* ── Columna: Legal ── */}
          <div className="col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled" style={{ opacity: 0.8 }}>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Privacidad
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Términos
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr style={{ opacity: 0.2, margin: '2rem 0' }} />

        {/* ── Bottom Footer ── */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start" style={{ opacity: 0.7, fontSize: '0.95rem' }}>
            <p className="mb-0">
              © {currentYear} PetManager. Todos los derechos reservados. ✨
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end" style={{ opacity: 0.7 }}>
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <a href="#" className="text-white text-decoration-none" title="Twitter">
                𝕏
              </a>
              <a href="#" className="text-white text-decoration-none" title="GitHub">
                🐙
              </a>
              <a href="#" className="text-white text-decoration-none" title="Discord">
                💬
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
