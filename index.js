const express = require('express');
//hedhy mtaa frontend
const cors = require('cors');
require('dotenv').config();
const FilmModel = require('./models/models');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
//teebaa l frontend
app.use(cors());

app.use(express.json());

app.post('/film/ajouter', async (req, res) => {
  const filmObj = {
    titre:req.body.titre,
    duree:req.body.duree,
    genre:req.body.genre,
    realisateur:req.body.realisateur,
    anneeSortie:req.body.anneeSortie,
  };
  try {
    const createdFilm = await FilmModel.create(filmObj);
    res.status(200).json({ createdFilm });
  } catch (error) {
    res.status(400).json({ error });
  }
});
app.put('/film/modifier/:id', (req,res) => {
  const param = req.params.id;
  const modifiedObj = {
    titre: req.body.titre,
    duree: req.body.duree,
    genre:req.body.genre,
    realisateur:req.body.realisateur,
    anneeSortie:req.body.anneeSortie,
  };
  FilmModel.findByIdAndUpdate(param, modifiedObj)
    .then(modifiedFilm => {
      res.status(200).json({ "message": "Modifier contact avec succès" });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});
app.delete('/film/:id/supprimer', (req, res) => {
  const filmId = req.params.id;
  FilmModel.findByIdAndDelete(filmId)
    .then(deletedFilm => {
      if (!deletedFilm) {
        res.status(404).json({ "message": "Film introuvable" });
        return;
      }
      res.status(200).json({ "message": "Film supprimé avec succès" });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// Exemple côté serveur (Node.js/Express)
app.get('/reservations/:date', (req, res) => {
  /*const param = req.params.date; */
  FilmModel.find({})
    .then(films => {
      res.status(200).json(films);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

// rechercher film by titre ou duree

app.get('/film/rechercher', (req, res) => {
  const keyword = req.query.keyword; // Récupérer le mot-clé de la requête

  // Recherche dans la base de données MongoDB en utilisant le mot-clé
  FilmModel.find({
    $or: [
      { titre: { $regex: keyword, $options: 'i' } }, // Recherche par nom de film (insensible à la casse)
      { duree: { $regex: keyword, $options: 'i' } } // Recherche par description (insensible à la casse)
    ]
  })
    .then(results => {
      res.status(200).json({ results });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});
//
app.get('/film/rechercher', (req, res) => {
  const keyword = req.query.keyword;

  // Recherche dans les champs appropriés (titre, duree) dans la base de données MongoDB
  FilmModel.find({
    $or: [
      { titre: { $regex: keyword, $options: 'i' } },
      { duree: { $regex: keyword, $options: 'i' } }
    ]
  })
    .then(results => {
      res.status(200).json({ results });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});






app.get('/film/:id', (req, res) => {
  const filmId = req.params.id;
  FilmModel.findById(filmId)
    .then(film => {
      if (!film) {
        res.status(404).json({ "message": "Film introuvable" });
        return;
      }
      res.status(200).json(film);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});
const userRoute = require('./routes/user.router');
app.use('/users', userRoute);

mongoose.connect('mongodb://127.0.0.1:27017/projetnode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Database connected successfully');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
