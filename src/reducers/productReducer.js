import isEmpty from '../validation/is-empty';
import { GET_PRODUCTS_HOME, GET_PRODUCTS_SECTION, GET_PRODUCT, GET_PRODUCTS_FAV } from '../actions/types';

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
    case GET_PRODUCT:
      return {
        ...state,
        detailProduct: action.payload
      }
    case GET_PRODUCTS_FAV:
      return {
        ...state,
        products: action.payload
      }
    default:
      return state;
  }
}