const express = require('express');
const router = express.Router();
const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petController');

// GET    /api/pets        obtener todas
// POST   /api/pets        crear una nueva
router.route('/').get(getAllPets).post(createPet);

// GET    /api/pets/:id   obtener una
// PUT    /api/pets/:id   actualizar una
// DELETE /api/pets/:id   eliminar una
router.route('/:id').get(getPetById).put(updatePet).delete(deletePet);

module.exports = router;