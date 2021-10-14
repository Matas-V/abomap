import mongoose from 'mongoose';

const aboPlaceSchema = mongoose.Schema({
  title: String,
  creatorEmail: String,
  photos: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  description: String,
}, { collection: 'places-data' });

export default mongoose.model("AboPlace", aboPlaceSchema);