import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// register user action
export const registerUser = (userData, navigate) => dispatch => {
  axios.post('/api/users/register', userData)
  .then(res => navigate('/login'))
  .catch(error => dispatch({
    type: GET_ERRORS,
    payload: error.response.data
  }))
};

// login user action
export const loginUser = (userData, navigate) => dispatch => {
  axios.post('/api/users/login', userData)
  .then(res => { 
    // Save token to localStorage
    const { token } = res.data;

    // Set token to ls
    localStorage.setItem('token', token);
    // Set token to Auth header
    setAuthToken(token);
    const decoded = jwt_decode(token);
    // Set current user.
    dispatch(setCurrentUser(decoded));
  }
    )
  .catch(error => dispatch({
    type: GET_ERRORS,
    payload: error.response.data 
  }))
};

// Set current user
export const setCurrentUser = (decoded) => {
   return {
    type: SET_CURRENT_USER,
    payload: decoded
    
   }
};

export const logOutUser =()=> dispatch => {
// Remove the token from localStorage
    localStorage.removeItem('token');
  //Remove the token from the header
  setAuthToken(false);
//Remove the store from the user data;
  dispatch(setCurrentUser({}));

}