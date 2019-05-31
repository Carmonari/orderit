const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  aPaterno: {
    type: String
  },
  aMaterno: {
    type: String
  },
  cel: {
    type: String
  },
  avatar: {
    type: String
  },
  direcciones: [
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
  facturas: [
    {
      name: {
        type: String,
        require: true
      },
      tipo_persona: {
        type: String,
        require: true
      },
      razon_social: {
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

module.exports = User = mongoose.model('users', UserSchema);