const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const HomesSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  subtitulo: {
    type: String,
    default: null
  },
  img: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Homes = mongoose.model('homes', HomesSchema);