import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  // NavLink aplica clase 'active' automáticamente a la ruta activa
  const navLinkClass = ({ isActive }) =>
    `nav-link fw-semibold px-3 ${isActive ? 'text-primary' : 'text-dark'}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top py-3">
      <div className="container">
        {/* Logo y nombre */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span style={{ fontSize: '1.8rem' }}>🐾</span>
          <span className="navbar-brand-logo">PetManager</span>
        </Link>

        {/* Botón hamburguesa para móviles */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass} end>
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mascotas" className={navLinkClass}>
                Mascotas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/acerca-de" className={navLinkClass}>
                Acerca de
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacto" className={navLinkClass}>
                Contacto
              </NavLink>
            </li>
          </ul>

          {/* Botón CTA */}
          <Link to="/crear-mascota" className="btn btn-gradient px-4">
            ✨ Agregar Mascota
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;