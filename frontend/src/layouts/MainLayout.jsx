
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      {/* Outlet renderiza el componente de la ruta activa */}
      {/* Es como un "hueco" donde se insertan las páginas */}
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;