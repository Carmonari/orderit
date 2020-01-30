import { GET_PRODUCTS_HOME, GET_PRODUCTS_SECTION, GET_PRODUCT, GET_PRODUCTS_FAV, GET_PRODUCTS_SEARCH,
         GET_RATING, CLEAR_LOADING } from '../actions/types';

const initialState = {
  products: [],
  detailProduct: {},
  rating: {},
  loading: true
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_PRODUCTS_HOME:
    case GET_PRODUCTS_SECTION:
    case GET_PRODUCTS_FAV:
    case GET_PRODUCTS_SEARCH:
      return {
        ...state,
        products: action.payload,
        loading: false
      }
    case GET_RATING:
      return {
        ...state,
        rating: action.payload,
        loading: false
      }
    case GET_PRODUCT:
      return {
        ...state,
        detailProduct: action.payload,
        loading: false
      }
    case CLEAR_LOADING:
      return {
        ...state,
        loading: true,
        detailProduct: {}
      }
    default:
      return state;
  }
}