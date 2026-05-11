// services/petService.js
// Centraliza TODAS las llamadas a la API
// Si cambia la URL del backend, solo cambias aquí

import axios from 'axios';

// La URL base del backend
// En producción cambiarías esto por la URL del servidor real
const API_BASE_URL = 'http://localhost:5000/api';

// Creamos una instancia de Axios con configuración base
// Así no repetimos la URL en cada llamada
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos máximo de espera
});


// FUNCIONES DEL SERVICIO


// Obtener todas las mascotas con filtros opcionales
export const fetchAllPets = async (filters = {}) => {
  // params convierte el objeto en query string automáticamente
  // { species: 'Gato', mood: 'Feliz' } → ?species=Gato&mood=Feliz
  const response = await apiClient.get('/pets', { params: filters });
  return response.data;
};

// Obtener una mascota por ID
export const fetchPetById = async (id) => {
  const response = await apiClient.get(`/pets/${id}`);
  return response.data;
};

// Crear una nueva mascota
export const createPet = async (petData) => {
  const response = await apiClient.post('/pets', petData);
  return response.data;
};

// Actualizar una mascota existente
export const updatePet = async (id, petData) => {
  const response = await apiClient.put(`/pets/${id}`, petData);
  return response.data;
};

// Eliminar una mascota
export const deletePet = async (id) => {
  const response = await apiClient.delete(`/pets/${id}`);
  return response.data;
};

export default apiClient;