const router = require("express").Router();
const mongoose = require('mongoose');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const aboAdminPlace = require("../models/aboPlace")('adminPlaces-data');
const aboPlace = require("../models/aboPlace")('places-data');

router.get("/", async (req, res) => {
  try {
    let place = await aboPlace.find();
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let place = await aboPlace.findById(id);
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", upload.array("image", 5), async (req, res) => {
  try {
    // Upload image to cloudinary
    const uploader = async (path) => await cloudinary.uploader.upload(path, { folder: 'aboMapImg' });

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
    }

    const photos = urls.map((url) => url.secure_url);
    const cloud_ids = urls.map((url) => url.public_id);

    // Create new place
    let newPlace = new aboAdminPlace({
      title: req.body.title,
      name: req.body.name,
      description: req.body.description,
      photos: photos,
      cloudinary_id: cloud_ids,
      coords: {
        lat: req.body.lat, lon: req.body.lon, 
      },
    });

    // Save place
    await newPlace.save();
    res.status(201).json({
      message: "SUCCESSFULL! new place added!",
      data: newPlace
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch('/:id/likePlace', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const place = await aboPlace.findById(id);

    if (action === 'LIKE') {
      const updatedPlace = await aboPlace.findByIdAndUpdate(id, { likesCount: place.likesCount + 1 }, { new: true });
      res.json(updatedPlace);
    } else {
      const updatedPlace = await aboPlace.findByIdAndUpdate(id, { likesCount: place.likesCount - 1 }, { new: true });
      res.json(updatedPlace);
    }
    
  } catch (error) {
    console.log(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let place = await aboPlace.findById(req.params.id);
    
    for (const id of place.cloudinary_id) {
      await cloudinary.uploader.destroy(id);
    }

    await place.remove();
    res.status(200).json({
      message: "Place successfully deleted",
      data: place,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;