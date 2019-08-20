const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const PedidosSchema = new Schema({
  idCompra: {
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  entrega: {
    type: Date,
    default: null
  },
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
      },
      name: {
        type: String
      },
      img: {
        type: String
      },
      cantidad: {
        type: Number,
        require: true
      },
      precio: {
        type: Number,
        require: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  direccion: [
    {
      name: {
        type: String,
        require: true
      },
      numero_ext: {
        type: String
      },
      numero_int: {
        type: String
      },
      calle:{
        type: String
      },
      colonia: {
        type: String
      },
      municipio: {
        type: String
      },
      estado: {
        type: String,
        require: true
      },
      pais: {
        type: String,
        require: true
      },
      cp: {
        type: String
      },
      status: {
        type: Boolean,
        default: false
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pedidos = mongoose.model('pedidos', PedidosSchema);