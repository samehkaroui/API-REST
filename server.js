// server.js

// Importer les dépendances
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialiser l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect("mongodb+srv://samhkaroui:sameh12@contactlist.qlcaq.mongodb.net/?retryWrites=true&w=majority&appName=contactlist", {
    
})
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));




// Importer le modèle User
const User = require('./models/User');

// GET : Renvoyer tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST : Ajouter un nouvel utilisateur à la base de données
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT : Modifier un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE : Supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Lancer le serveur
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));