// function that takes in a piece of state
// array of objects

// dispatch set_alert, return array w/new alert(payload)
// dispatch remove_alert except one that matches payload

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


const initialState = [];

export default function (state = initialState, action) {

  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // in terms depending on type, decide what to send down as state
      // if there is an alert there, add additional
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }

}