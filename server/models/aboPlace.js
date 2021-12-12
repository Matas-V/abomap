const mongoose = require('mongoose');

const aboPlaceSchema = new mongoose.Schema({
  title: String,
  creatorEmail: String,
  photos: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  description: String,
  cloudinary_id: [String],
  likesCount: {
    type: Number,
    default: 0,
  },
  coords: {
    type: mongoose.Schema.Types.Mixed,
  },
  wiki: String,
});

module.exports = (collectionName) => mongoose.model("AboPlace", aboPlaceSchema, collectionName);