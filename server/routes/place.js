const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const aboPlace = require("../models/aboPlace");

router.get("/", async (req, res) => {
  try {
    let place = await aboPlace.find();
    res.status(200).json(place);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", upload.array("image", 8), async (req, res) => {
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
    let newPlace = new aboPlace({
      name: req.body.name,
      description: req.body.description,
      photos: photos,
      cloudinary_id: cloud_ids,
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