import express from 'express';
import mongoose from 'mongoose';

import aboPlace from '../models/aboPlace.js';

export const getPlaces = async (req, res) => {
  try {
    const places = await aboPlace.find();

    res.json({ data: places });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPlace = async (req, res) => {
  const place = req.body;

  const newPlace = new aboPlace({ ...place, createdAt: new Date().toISOString() });

  try {
    await newPlace.save();

    res.status(201).json(newPlace);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}