import axios from 'axios';
import { GET_ERRORS, GET_SECTIONS } from './types';

//Sections - get sections token
export const getSections = () => async (dispatch) => {
  try{
    let res = await axios.get('http://10.0.2.2:5000/api/sections');
    dispatch({
      type: GET_SECTIONS,
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
