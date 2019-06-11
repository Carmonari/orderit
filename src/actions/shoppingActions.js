import axios from 'axios';
import { GET_ERRORS, ADD_SHOPPING, GET_SHOPPING } from './types';

//add shopping
export const addShopping = (pedido) => async (dispatch) => {
  try {
    await axios.post(`http://10.0.2.2:5000/api/products/pedidos/`, pedido);
    
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Get shopping
export const getShopping = () => async (dispatch) => {
  try {
    let res = await axios.get(`http://10.0.2.2:5000/api/products/pedidos`);
    dispatch({
      type: GET_SHOPPING,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Get one product shopping
export const getOneShopping = (idCompra) => async (dispatch) => {
  try {
    let res = await axios.get(`http://10.0.2.2:5000/api/products/pedidos/${idCompra}`);
    dispatch({
      type: GET_SHOPPING,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}