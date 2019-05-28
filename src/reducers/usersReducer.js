import { ADD_USER, GET_PROFILE, EDIT_PROFILE, ADD_ADDRESS, DELETE_ADDRESS, UPDATE_STATUS, GET_ONE_ADDRESS,
        GET_ADDRESS } from '../actions/types';

const initialState = {
  infoUser: {},
  direccion: {}
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
      return {
        ...state,
        infoUser: action.payload
      }
    case GET_ONE_ADDRESS:
      return {
        ...state,
        direccion: action.payload
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