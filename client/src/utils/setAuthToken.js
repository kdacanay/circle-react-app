// function to take in token, if token is there, add to headers, if not, delete from headers
// if you have a token, you want to send it with every request (every component that needs auth)

// add global header using axios
import axios from 'axios';

const setAuthToken = token => {

  // if there is a token in local storage, this will send it with every request
  // if token is present, set global header
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // if not a token, delete from headers
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;