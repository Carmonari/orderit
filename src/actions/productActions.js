import axios from 'axios';
import { GET_ERRORS, GET_PRODUCTS_HOME, GET_PRODUCT } from './types';

//Products - get product token
export const getProductsForHome = (idHome) => async (dispatch) => {
  try{
    let res = await axios.get(`http://10.0.2.2:5000/api/products/${idHome}`);
    dispatch({
      type: GET_PRODUCTS_HOME,
      payload: res.data
    });
  }
  catch(err){
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  } 
}

//Products - get product
export const getProduct = (idProduct) => async(dispatch) => {
  try {
    let res = await axios.get(`http://10.0.2.2:5000/api/products/detail/${idProduct}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  }
  catch(err){
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}