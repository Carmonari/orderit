import { ADD_SHOPPING, GET_SHOPPING, GET_RATING_USER } from '../actions/types';

const initialState = {
  pedidos: [],
  rating: []
}

export default function(state = initialState, action){
  switch(action.type){
    case ADD_SHOPPING:
    case GET_SHOPPING:
      return {
        ...state,
        pedidos: action.payload
      }
    default:
      return state;
  }
}