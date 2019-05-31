import { ADD_USER, GET_PROFILE, EDIT_PROFILE, ADD_ADDRESS, DELETE_ADDRESS, UPDATE_STATUS, GET_ONE_ADDRESS,
        ADD_BILL, GET_BILLS, DELETE_BILL, GET_ONE_BILL, GET_ADDRESS } from '../actions/types';

const initialState = {
  infoUser: {},
  direccion: {},
  facturas: {}
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_USER:
    case ADD_ADDRESS:
      return {
        ...state
      }
    case GET_PROFILE:
    case GET_ADDRESS:
    case DELETE_ADDRESS:
    case UPDATE_STATUS:
    case GET_BILLS:
    case DELETE_BILL:
      return {
        ...state,
        infoUser: action.payload
      }
    case GET_ONE_ADDRESS:
      return {
        ...state,
        direccion: action.payload
      }
    case ADD_BILL:
    case GET_ONE_BILL:
      return {
        ...state,
        facturas: action.payload
      }
    case EDIT_PROFILE:
      return {
        ...state,
        infoUser: action.payload
      }
    default:
      return state;
  }
}