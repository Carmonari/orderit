import { ADD_USER, GET_PROFILE, EDIT_PROFILE } from '../actions/types';

const initialState = {
  infoUser: {}
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_USER:
      return {
        ...state
      }
    case GET_PROFILE:
      return {
        ...state,
        infoUser: action.payload
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