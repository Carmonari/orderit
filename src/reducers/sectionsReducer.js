import isEmpty from '../validation/is-empty';
import { GET_SECTIONS } from '../actions/types';

const initialState = {
  sections: []
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload
      }
    default:
      return state;
  }
}