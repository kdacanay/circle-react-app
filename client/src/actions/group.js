import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_GROUPS,
  GROUP_ERROR,
  ADD_GROUP,
  DELETE_GROUP,
  ADD_MEMBER
} from './types';

// Get Groups

export const getGroups = () => async dispatch => {

  try {

    const res = await axios.get('/api/groups');

    dispatch({
      type: GET_GROUPS,
      payload: res.data
    });

  } catch (err) {

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

  }

};

// Add Group

export const addGroup = formData => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('api/groups', formData, config);

    dispatch({
      type: ADD_GROUP,
      payload: res.data
    });

    dispatch(setAlert('Group Created', 'success'));
  } catch (err) {

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }

};

// Delete group
export const deleteGroup = id => async dispatch => {
  try {
    await axios.delete(`/api/groups/${id}`);

    dispatch({
      type: DELETE_GROUP,
      payload: id
    });

    dispatch(setAlert('Group Removed', 'success'));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add member to Group (join group)
export const addMember = (groupId, formData) => async dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  try {
    const res = await axios.post(`/api/groups/user/${groupId}`, formData, config);

    dispatch({
      type: ADD_MEMBER,
      payload: res.data
    });

    dispatch(setAlert('Group Member Added', 'success'));
  } catch (err) {
    if (err.response) {
      console.log(err.response);
    } else if (err.request) {
      console.log(err.request);
    } else if (err.message) {
      console.log(err.message);
    }



    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};