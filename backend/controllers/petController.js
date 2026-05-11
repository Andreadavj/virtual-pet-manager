const Pet = require('../models/Pet');


// GET /api/pets — Obtener todas las mascotas

const getAllPets = async (req, res) => {
  try {
    // Soporte para búsqueda y filtros desde query params
    // Ejemplo: GET /api/pets?species=Gato&mood=Feliz&search=luna
    const { species, mood, search } = req.query;
    
    // Construimos el filtro dinámicamente
    const filter = { isActive: true };
    
    if (species) filter.species = species;
    if (mood) filter.mood = mood;
    if (search) {
      // $regex permite búsqueda parcial, $options: 'i' = case insensitive
      filter.name = { $regex: search, $options: 'i' };
    }
    
    // .find(filter) busca documentos que coincidan con el filtro
    // .sort({ createdAt: -1 }) ordena del más nuevo al más viejo
    const pets = await Pet.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las mascotas',
      error: error.message,
    });
  }
};

// GET /api/pets/:id — Obtener una mascota por ID

const getPetById = async (req, res) => {
  try {
    // req.params.id extrae el :id de la URL
    // Ejemplo: GET /api/pets/64abc123... → req.params.id = "64abc123..."
    const pet = await Pet.findById(req.params.id);
    
    // Si no existe, devolvemos 404
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada',
      });
    }
    
    res.status(200).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    // Error de ID con formato inválido
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de mascota inválido',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al obtener la mascota',
      error: error.message,
    });
  }
};

// POST /api/pets — Crear una nueva mascota

const createPet = async (req, res) => {
  try {
    // req.body contiene los datos enviados desde el frontend (JSON)
    // express.json() middleware parsea ese JSON automáticamente
    const { name, species, mood, age, image, description } = req.body;
    
    // Crear nueva instancia del modelo con los datos
    const newPet = await Pet.create({
      name,
      species,
      mood,
      age,
      image,
      description,
    });
    
    // 201 = Created (recurso creado exitosamente)
    res.status(201).json({
      success: true,
      message: 'Mascota creada exitosamente',
      data: newPet,
    });
  } catch (error) {
    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al crear la mascota',
      error: error.message,
    });
  }
};


// PUT /api/pets/:id — Actualizar una mascota

const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,   // qué documento actualizar
      req.body,         // con qué datos
      {
        new: true,           // devuelve el documento ACTUALIZADO (no el viejo)
        runValidators: true, // ejecuta validaciones del Schema al actualizar
      }
    );
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Mascota actualizada exitosamente',
      data: pet,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: messages,
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de mascota inválido',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la mascota',
      error: error.message,
    });
  }
};


// DELETE /api/pets/:id — Eliminar una mascota

const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada',
      });
    }
    
    res.status(200).json({
      success: true,
      message: `La mascota "${pet.name}" fue eliminada exitosamente`,
      data: pet,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de mascota inválido',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la mascota',
      error: error.message,
    });
  }
};

// Exportamos todas las funciones para usarlas en las rutas
module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};