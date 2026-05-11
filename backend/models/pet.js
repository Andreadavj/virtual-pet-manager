const mongoose = require('mongoose');

// Schema = plantilla/molde para los documentos
// Define qué campos tendrá cada mascota y sus reglas
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la mascota es obligatorio'],
      trim: true,          // elimina espacios al inicio y final
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [50, 'El nombre no puede superar 50 caracteres'],
    },
    species: {
      type: String,
      required: [true, 'La especie es obligatoria'],
      // enum limita los valores permitidos
      enum: {
        values: ['Perro', 'Gato', 'Conejo', 'Pájaro', 'Pez', 'Hamster', 'Tortuga', 'Otro'],
        message: '{VALUE} no es una especie válida',
      },
    },
    mood: {
      type: String,
      required: [true, 'El estado de ánimo es obligatorio'],
      enum: {
        values: ['Feliz', 'Triste', 'Emocionado', 'Hambriento', 'Cansado', 'Juguetón', 'Enojado'],
        message: '{VALUE} no es un estado de ánimo válido',
      },
      default: 'Feliz',
    },
    age: {
      type: Number,
      required: [true, 'La edad es obligatoria'],
      min: [0, 'La edad no puede ser negativa'],
      max: [100, 'La edad máxima es 100 años'],
    },
    image: {
      type: String,
      // URL de imagen — usaremos URLs de placeholder por defecto
      default: function() {
        const images = {
          'Perro': 'https://placedog.net/500/500?r',
          'Gato': 'https://placekitten.com/500/500',
          'Conejo': 'https://place.dog/500/500',
        };
        return images[this.species] || 'https://placebear.com/500/500';
      },
    },
    description: {
      type: String,
      maxlength: [300, 'La descripción no puede superar 300 caracteres'],
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // timestamps: true agrega automáticamente createdAt y updatedAt
    timestamps: true,
    // versionKey: false elimina el campo __v que Mongoose agrega por defecto
    versionKey: false,
  }
);

// Model = clase que usamos para interactuar con la colección
// mongoose.model('Pet', petSchema) crea/usa la colección 'pets' en MongoDB
// (Mongoose pluraliza y pone en minúsculas automáticamente)
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;