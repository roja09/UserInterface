const mongoose = require('mongoose');
const { timestamp } = require('rxjs');
const Schema = mongoose.Schema;

let Movie = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  movieName: {
    type: String
  },
  cast: {
    type: String
  },
  director: {
    type: String
  },
  releaseDate: {
    type: Date
  },
  duration: {
    type: String
  },
  songs: {
    type: String
  },
  //poster: {
    //type: String
  //},
  genre: {
    type: String
  },
  description: {
    type: String
  }
}, {
  collection: 'movies'
})


module.exports = mongoose.model('Movie', Movie)
