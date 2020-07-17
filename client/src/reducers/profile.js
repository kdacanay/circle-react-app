// get profile, create, update, etc

import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types";


// when logging in, get request to retrieve profile for user, also retrieve profile when looking at another user's profile

const initialState = {
  profile: null,
  // empty array for profile listing
  profiles: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {

  const { type, payload } = action;


  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}