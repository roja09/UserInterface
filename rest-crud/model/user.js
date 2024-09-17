const mongoose = require('mongoose');
const { timestamp } = require('rxjs');
const Schema = mongoose.Schema;

let reviewer=new Schema({
  id:{
    type:String
  },
  username:{
    type:String
  },
  name:{
    type:String
  },
  password:{
    type: String
  },
  timestamp:{
    type:Date
  }
},{
  collection: 'reviewer'
}
)
module.exports = mongoose.model('reviewer',reviewer)