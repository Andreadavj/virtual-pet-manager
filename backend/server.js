
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const petRoutes = require('./routes/petRoutes');
const errorHandler = require('./middleware/errorHandler');

// Cargar variables de entorno PRIMERO
// Debe ser lo primero para que process.env esté disponible
dotenv.config();

// Conectar a MongoDB
connectDatabase();

// Crear la aplicación Express
const app = express();


// MIDDLEWARES GLOBALES

// CORS: permite peticiones desde el frontend (React en puerto 5173)
// Sin esto, el navegador bloquea las peticiones por seguridad
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// express.json() parsea el body de las peticiones POST/PUT
// Sin esto, req.body estaría undefined
app.use(express.json());

// express.urlencoded() parsea datos de formularios HTML tradicionales
app.use(express.urlencoded({ extended: true }));


// RUTAS


// Ruta de prueba — health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🐾 API de Mascotas Virtuales funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      pets: '/api/pets',
      petById: '/api/pets/:id',
    },
  });
});

// Montar rutas de mascotas
// Todas las rutas de petRoutes.js tendrán el prefijo /api/pets
app.use('/api/pets', petRoutes);

// Ruta 404 — cuando nadie más manejó la petición
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
  });
});

// Middleware de errores — siempre al FINAL
// Express sabe que es un error handler por los 4 parámetros (err, req, res, next)
app.use(errorHandler);


// INICIAR SERVIDOR

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`🐾 API Lista en http://localhost:${PORT}/api/pets\n`);
});