const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(!Validator.isLength(data.name, { min: 2, max: 30 })){
    errors.name = 'Nombre de contener entre 2 y 30 letras';
  }

  if(Validator.isEmpty(data.name)){
    errors.name = 'El nombre es requerido';
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'El email es requerido';
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'El email es invalido';
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password es requerido';
  }

  if(!Validator.isLength(data.password, { min: 6, max: 30 })){
    errors.password = 'Password de de tener entre 6 y 30 letras';
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = 'Password es requerido';
  }

  if(!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords no coinciden';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}