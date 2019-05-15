const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  tipo: {
    type: String,
    default: ''
  },
  descripcion: {
    type: String,
    required: true
  },
  home: {
    type: String,
    required: true
  },
  seccion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    require: true
  },
  img: {
    type: String,
    require: true
  },
  unidad: {
    type: String,
    require: true
  },
  stock: {
    type: Number,
    required: true
  },
  tags: {
    type: Array,
    default: void 0,
    required: false
  },
  status: {
    type: Boolean,
    default: true
  },
  descuento: {
    type: Number,
    default: 0
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('products', ProductSchema);