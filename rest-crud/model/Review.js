const mongoose = require('mongoose');
const { timestamp } = require('rxjs');
const Schema = mongoose.Schema;

let Review=new Schema({
  content:{
    type:String
  },
  id:{
    type:String
  },
  movieId:{
    type:String
  },
  timestamp:{
    type:Date
  }
},{
  collection: 'reviews'
}
)
module.exports = mongoose.model('Review', Review)