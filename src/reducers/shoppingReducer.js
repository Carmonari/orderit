import isEmpty from '../validation/is-empty';
import { ADD_SHOPPING, GET_SHOPPING } from '../actions/types';

const initialState = {
  pedidos: []
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