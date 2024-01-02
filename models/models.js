const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    //hounii naaml declaration mteehouum
titre: {
    type: String,
    required: true
  },
duree: {
    type: String,
    required: true
  },
realisateur: {
    type: String,
    required: true
},
genre: {
  type: String,
  required: true
},
anneeSortie: {
  type: Date,
  required: true
}
},{timestamps : true});

const FilmModel = mongoose.model('projet', FilmSchema);

module.exports = FilmModel;
