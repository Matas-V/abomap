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
}, { collection: 'places-data' });

module.exports = mongoose.model("AboPlace", aboPlaceSchema);