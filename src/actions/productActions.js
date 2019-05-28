import axios from 'axios';
import { GET_ERRORS, GET_PRODUCTS_HOME, GET_PRODUCTS_SECTION, GET_PRODUCT, GET_PRODUCTS_FAV } from './types';

//Products - get product token
export const getProductsForHome = (idHome) => async (dispatch) => {
  try{
    let res = await axios.get(`http://10.0.2.2:5000/api/products/home/${idHome}`);
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

//Products - get product token
export const getProductsForSection = (idHome) => async (dispatch) => {
  try{
    let res = await axios.get(`http://10.0.2.2:5000/api/products/section/${idHome}`);
    dispatch({
      type: GET_PRODUCTS_SECTION,
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
export const getProduct = (idProduct) => async (dispatch) => {
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

//Products Like(favorite)
export const addLike = (id, HomeSection, idHome) => async (dispatch) => {
  try {
    await axios.put(`http://10.0.2.2:5000/api/products/like/${id}`);

    if(HomeSection === 'home'){
      await dispatch(getProductsForHome(idHome));
    } else if(HomeSection === 'seccion') {
      await dispatch(getProductsForSection(idHome));
    } else {
      await dispatch(getFav())
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Remove like(favorite)
export const unLike = (id, HomeSection, idHome) => async (dispatch) => {
  try {
    await axios.put(`http://10.0.2.2:5000/api/products/unlike/${id}`);
    if(HomeSection === 'home'){
      await dispatch(getProductsForHome(idHome));
    } else if(HomeSection === 'seccion') {
      await dispatch(getProductsForSection(idHome));
    } else {
      await dispatch(getFav())
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Get likes products for user
export const getFav = () => async (dispatch) => {
  try {
    let res = await axios.get(`http://10.0.2.2:5000/api/products/like/`);
    dispatch({
      type: GET_PRODUCTS_FAV,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}