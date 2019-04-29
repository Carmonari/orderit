const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const SectionSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  home: {
    type: String,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    default: true
  },
  descuento: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Section = mongoose.model('sections', SectionSchema);