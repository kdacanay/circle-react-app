// make request, get response, if successful, dispatch register success, fail, register fail

// where request is made
import axios from 'axios';
// can use alert anywhere because of redux
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';


// Load user
export const loadUser = () => async dispatch => {

  // always send token in local storage
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  // then make request
  try {

    const res = await axios.get('/api/auth');
    // if okay, dispatch loaded user
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};



// Register User
// using async await 
export const register = ({ name, email, password }) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    // post request to get response
    const res = await axios.post('api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    // errors is an array
    const errors = err.response.data.errors;

    // check if errors exist, if true then loop and dispatch
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    // no payload needed if register failed
    dispatch({
      type: REGISTER_FAIL
    });
  }
};


// Login User
// using async await 
export const login = (email, password) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    // post request to get response
    const res = await axios.post('api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

  } catch (err) {
    // errors is an array
    const errors = err.response.data.errors;

    // check if errors exist, if true then loop and dispatch
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    // no payload needed if login failed
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// for logging out user / clear profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};