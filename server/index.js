const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const placesRoutes = require('./routes/place.js');
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route
app.use('/places', placesRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`)))
  .catch((error) => console.log(error.message))