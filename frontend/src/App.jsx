
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PetsPage from './pages/PetsPage';
import PetDetailPage from './pages/PetDetailPage';
import CreatePetPage from './pages/CreatePetPage';
import EditPetPage from './pages/EditPetPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
  
    <Routes>
    
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="mascotas" element={<PetsPage />} />
        <Route path="mascotas/:id" element={<PetDetailPage />} />
        <Route path="crear-mascota" element={<CreatePetPage />} />
        <Route path="editar-mascota/:id" element={<EditPetPage />} />
        <Route path="acerca-de" element={<AboutPage />} />
        <Route path="contacto" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}

export default App;