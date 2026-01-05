import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
  const [compte, setCompte] = useState({ solde: '', dateCreation: '', type: 'COURANT' });

  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!compte.solde || !compte.dateCreation || !compte.type) {
      alert("Tous les champs sont obligatoires !");
      return;
    }

    const compteToSend = {
      solde: parseFloat(compte.solde),
      dateCreation: compte.dateCreation,
      type: compte.type
    };

    axios.post(`${API_BASE_URL}/comptes`, compteToSend)
         .then(res => alert("Compte ajouté !"))
         .catch(err => console.error("AxiosError", err));
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Solde</label>
          <input type="number" name="solde" className="form-control" onChange={handleChange} value={compte.solde} />
        </div>
        <div className="mb-3">
          <label>Date de Création</label>
          <input type="date" name="dateCreation" className="form-control" onChange={handleChange} value={compte.dateCreation} />
        </div>
        <div className="mb-3">
          <label>Type</label>
          <select name="type" className="form-select" onChange={handleChange} value={compte.type}>
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
}

export default CompteForm;
