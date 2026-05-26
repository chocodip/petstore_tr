import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', age: '' });

  const fetchPets = async () => {
    try {
      const response = await axios.get(`${API_URL}/pets`);
      setPets(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const addPet = async () => {
    try {
      await axios.post(`${API_URL}/pets`, form);
      setForm({ name: '', type: '', age: '' });
      fetchPets();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePet = async (id) => {
    try {
      await axios.delete(`${API_URL}/pets/${id}`);
      fetchPets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PETSTORE</h1>

      <input
        placeholder="Pet Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Pet Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      />

      <input
        placeholder="Pet Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <button onClick={addPet}>Add Pet</button>

      <hr />

      {pets.map((pet) => (
        <div key={pet._id || pet.id}>
          <h3>{pet.name}</h3>
          <p>{pet.type}</p>
          <p>{pet.age}</p>

          <button onClick={() => deletePet(pet._id || pet.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;