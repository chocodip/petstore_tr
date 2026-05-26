const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number
});

const Pet = mongoose.model('Pet', PetSchema);

app.get('/pets', async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
});

app.post('/pets', async (req, res) => {
  const pet = new Pet(req.body);
  await pet.save();
  res.json(pet);
});

app.put('/pets/:id', async (req, res) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json(pet);
});

app.delete('/pets/:id', async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pet deleted' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});