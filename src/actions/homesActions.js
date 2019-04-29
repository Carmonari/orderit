import axios from 'axios';
import { GET_ERRORS, GET_HOMES } from './types';

//Homes - get home token
export const getHomes = () => async (dispatch) => {
  try{
    let res = await axios.get('http://10.0.2.2:5000/api/homes');
    dispatch({
      type: GET_HOMES,
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
