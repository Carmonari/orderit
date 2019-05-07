import isEmpty from '../validation/is-empty';
import { GET_PRODUCTS_HOME, GET_PRODUCTS_SECTION, GET_PRODUCT } from '../actions/types';

const initialState = {
  products: [],
  detailProduct: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_PRODUCTS_HOME:
      return {
        ...state,
        products: action.payload
      }
    case GET_PRODUCTS_SECTION:
      return {
        ...state,
        products: action.payload
      }
    case GET_PRODUCT:{
      return {
        ...state,
        detailProduct: action.payload
      }
    }
    default:
      return state;
  }
}