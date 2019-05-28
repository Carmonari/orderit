import axios from 'axios';
import { ADD_USER, GET_PROFILE, ADD_ADDRESS, GET_ADDRESS, DELETE_ADDRESS, UPDATE_STATUS, GET_ONE_ADDRESS,
        GET_ERRORS, CLEAR_ERRORS } from './types';

//Add user
export const addUser = (newUser, history) => async dispatch => {
  try{
    dispatch(clearErrors());
    let res = await axios.post('http://10.0.2.2:5000/api/users/register', newUser);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
    history.push('/');
  }
  catch(err){
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

//Get profile
export const getProfile = (id) => async dispatch => {
 try {
   let res = await axios.get(`http://10.0.2.2:5000/api/users/profile/${id}`);
   dispatch({
     type: GET_PROFILE,
     payload: res.data
   })
 } catch (err) {
  dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  });
 }
}

//Edit profile
export const editProfile = (id, editProfile, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    let res = await axios.put(`http://10.0.2.2:5000/api/users/profile/${id}`, editProfile);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    history.push('/perfil-info');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

//Add direcciones
export const addAddress = (direcciones, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.patch(`http://10.0.2.2:5000/api/users/direcciones`, direcciones);
    dispatch({
      type: ADD_ADDRESS,
      payload: res.data
    });
    history.push('/direcciones')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

//Edit direccion
export const editAddress = (id, direcciones, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    await axios.patch(`http://10.0.2.2:5000/api/users/direcciones/${id}`, direcciones);
    history.push('/direcciones')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Get address
export const getAddress = () => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.get(`http://10.0.2.2:5000/api/users/direcciones`);
    dispatch({
      type: GET_ADDRESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Get one address
export const getOneAddress = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.get(`http://10.0.2.2:5000/api/users/direcciones/${id}`);
    dispatch({
      type: GET_ONE_ADDRESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// delete address
export const deleteAdd = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.delete(`http://10.0.2.2:5000/api/users/direcciones/${id}`);
    dispatch({
      type: DELETE_ADDRESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// change status
export const changeStatus = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.patch(`http://10.0.2.2:5000/api/users/direcciones/status/${id}`);
    dispatch({
      type: UPDATE_STATUS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}