import axios from 'axios';
import { ADD_USER, GET_PROFILE, ADD_ADDRESS, GET_ADDRESS, DELETE_ADDRESS, UPDATE_STATUS, GET_ONE_ADDRESS,
        ADD_BILL, GET_BILLS, DELETE_BILL, GET_ONE_BILL, GET_ERRORS, CLEAR_ERRORS } from './types';

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

//Forgot pass
export const forgotPass = (email, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    let res = await axios.post('http://10.0.2.2:5000/api/users/forgot', email);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
    history.push('/');
  } catch (err) {
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

//Add bills
export const addBills = (bills, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.patch(`http://10.0.2.2:5000/api/users/facturas`, bills);
    dispatch({
      type: ADD_BILL,
      payload: res.data
    });
    history.push('/datos-facturacion')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

//Edit facturas
export const editBill = (id, bills, history) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    await axios.patch(`http://10.0.2.2:5000/api/users/facturas/${id}`, bills);
    history.push('/datos-facturacion')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Get bill
export const getBills = () => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.get(`http://10.0.2.2:5000/api/users/facturas`);
    dispatch({
      type: GET_BILLS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Get one bill
export const getOneBill = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.get(`http://10.0.2.2:5000/api/users/facturas/${id}`);
    dispatch({
      type: GET_ONE_BILL,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// delete bills
export const deleteBill = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.delete(`http://10.0.2.2:5000/api/users/facturas/${id}`);
    dispatch({
      type: DELETE_BILL,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// change status Bills
export const changeStatusBill = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    let res = await axios.patch(`http://10.0.2.2:5000/api/users/facturas/status/${id}`);
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