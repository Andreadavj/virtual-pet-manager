
// Este archivo maneja la conexión a MongoDB usando Mongoose

const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    // mongoose.connect() intenta conectarse a MongoDB
    // process.env.MONGODB_URI lee la variable del archivo .env
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB conectado: ${connection.connection.host}`);
    console.log(`📦 Base de datos: ${connection.connection.name}`);
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    // process.exit(1) detiene la aplicación si no hay DB
    // No tiene sentido correr la app sin base de datos
    process.exit(1);
  }
};

module.exports = connectDatabase;