const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cloudinary = require("../utils/cloudinary");
const aboAdminPlace = require("../models/aboPlace")('adminPlaces-data');
const aboPlace = require("../models/aboPlace")('places-data');

router.get('/places/requests', verifyToken, async (req, res) => {
  const places = await aboAdminPlace.find();

  await jwt.verify(req.token, process.env.ADMIN_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        auth: true,
        authData,
        data: places,
      });
    }
  });
});

router.get('/places', verifyToken, async (req, res) => {
  const places = await aboPlace.find();

  await jwt.verify(req.token, process.env.ADMIN_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        auth: true,
        authData,
        data: places,
      });
    }
  });
});

router.get("/places/requests/:id", verifyToken, async (req, res) => {
  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id } = req.params;
      let place = await aboAdminPlace.findById(id);
      res.status(200).json(place);
    }
  })
});

router.get("/places/:id", verifyToken, async (req, res) => {
  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { id } = req.params;
      let place = await aboPlace.findById(id);
      res.status(200).json(place);
    }
  })
});

router.delete('/places/:id', verifyToken, async (req, res) => {
  let place = await aboPlace.findById(req.params.id);

  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      for (const id of place.cloudinary_id) {
        await cloudinary.uploader.destroy(id);
      }

      await place.remove();
      res.status(200).json({
        message: "Place successfully deleted",
        data: place,
      });
    }
  });
});

router.delete('/places/requests/:id', verifyToken, async (req, res) => {
  let place = await aboAdminPlace.findById(req.params.id);

  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      for (const id of place.cloudinary_id) {
        await cloudinary.uploader.destroy(id);
      }

      await place.remove();
      res.status(200).json({
        message: "Place successfully deleted",
        data: place,
      });
    }
  });
});

router.post('/places/edit/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send(`No post with id: ${req.params.id}`);
      const { title, description, wiki, coords } = req.body;

      const updatedPlace = await aboPlace.findByIdAndUpdate(req.params.id, {
        title: title, description: description, wiki: wiki, coords: coords,
      }, { new: true });
      res.json(updatedPlace);
    }
  })
});

router.post('/requests/edit/:id', verifyToken, async (req, res) => {
  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send(`No post with id: ${req.params.id}`);
      const { title, description, wiki, coords } = req.body;

      const updatedPlace = await aboAdminPlace.findByIdAndUpdate(req.params.id, {
        title: title, description: description, wiki: wiki, coords: coords,
      }, { new: true });
      res.json(updatedPlace);
    }
  })
});

// moving from admin-db to abomap-db
router.delete('/places/save/:id', verifyToken, async (req, res) => {
  let place = await aboAdminPlace.findById(req.params.id);
  
  await jwt.verify(req.token, process.env.ADMIN_SECRET, async (err) => {
    if (err) {
      res.sendStatus(403);
    } else {
      
      let newPlace = new aboPlace({
        title: place.title,
        name: place.name,
        description: place.description,
        photos: place.photos,
        cloudinary_id: place.cloudinary_id,
        coords: place.coords,
      });

      await place.remove();
      await newPlace.save();

      res.status(200).json({
        message: "Place successfully transported to DB.",
        data: newPlace,
      });
    }
  });
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
    const hash = bcrypt.hashSync(password, 8);

    const user = {
      id: 1,
      username: name,
      password: hash,
    };

    jwt.sign({ user }, process.env.ADMIN_SECRET, { expiresIn: '1h' }, (err, token) => {
      res.json({
        token,
      });
    })
  } else {
    res.status(401).json({
      message: 'Unauthorized user!'
    })
  }
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;