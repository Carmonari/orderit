import isEmpty from '../validation/is-empty';
import { GET_HOMES } from '../actions/types';

const initialState = {
  homes: []
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_HOMES:
      return {
        ...state,
        homes: action.payload
      }
    default:
      return state;
  }
}